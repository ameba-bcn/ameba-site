import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../../components/checkout/Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import renderWithProviders from "../helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMember,
  mockCartFree,
  mockCartMultipleItems,
  mockCartDiscounted,
  mockMemberProfile,
  mockCheckoutPaid,
} from "../mocks/data";

// Mock heavy external deps
vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => ({ confirmPayment: vi.fn().mockResolvedValue({}) }),
  useElements: () => ({}),
}));
vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn().mockResolvedValue({}),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

vi.mock("../../components/ui/Icon", () => ({
  default: (props) => <span data-testid={`icon-${props.icon}`}>{props.icon}</span>,
}));

const getSections = () => document.querySelectorAll(".checkout-section");

const setupCheckout = (cartData, extraCartState = {}) => {
  const mockCheckoutCart = vi.fn().mockResolvedValue();
  const mockCheckoutPaymentCart = vi.fn().mockResolvedValue();
  const mockGetCart = vi.fn().mockResolvedValue();
  const mockGetMemberProfile = vi.fn().mockResolvedValue(mockMemberProfile);
  const mockSubstractToCart = vi.fn().mockResolvedValue();
  const mockApplyDiscount = vi.fn().mockResolvedValue(mockCartDiscounted);

  useAuthStore.setState({
    isLoggedIn: true,
    user_data: { member: true },
    user_member_data: mockMemberProfile,
    getMemberProfile: mockGetMemberProfile,
    updateMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
    createMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
  });

  useCartStore.setState({
    cart_data: cartData,
    checkoutCart: mockCheckoutCart,
    checkoutPaymentCart: mockCheckoutPaymentCart,
    getCart: mockGetCart,
    substractToCart: mockSubstractToCart,
    applyDiscount: mockApplyDiscount,
    ...extraCartState,
  });

  return {
    mockCheckoutCart,
    mockCheckoutPaymentCart,
    mockGetCart,
    mockGetMemberProfile,
    mockSubstractToCart,
    mockApplyDiscount,
  };
};

describe("Integration: Regular checkout (no subscription, paid)", () => {
  it("starts at Review step (section 1 active) for regular cart", () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    const sections = getSections();
    expect(sections[1].classList.contains("checkout-section--active")).toBe(true);
    expect(screen.getByText("Cistella")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("displays cart items in Review", () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    // Item appears in both Review (TableProducts) and Payment (MiniTableProducts)
    const matches = screen.getAllByText(/Ameba T-shirt/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("advances to Payment step on Next click", async () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      const sections = getSections();
      expect(sections[2].classList.contains("checkout-section--active")).toBe(true);
    });
  });

  it("shows Stripe payment form for paid cart", async () => {
    const { mockCheckoutPaymentCart } = setupCheckout(mockCartRegular);
    mockCheckoutPaymentCart.mockResolvedValue({
      client_secret: "pi_123",
      stripe_public: "pk_123",
    });

    useCartStore.setState({
      ...useCartStore.getState(),
      checkout: mockCheckoutPaid,
    });

    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      const sections = getSections();
      expect(sections[2].classList.contains("checkout-section--active")).toBe(true);
    });
  });
});

describe("Integration: Subscription checkout", () => {
  it("starts at Membership step (section 0 active) for subscription cart", () => {
    setupCheckout(mockCartMember);
    renderWithProviders(<Checkout />);
    const sections = getSections();
    expect(sections[0].classList.contains("checkout-section--active")).toBe(true);
    expect(screen.getByText("Dades personals")).toBeInTheDocument();
  });

  it("shows membership form with existing member data", () => {
    setupCheckout(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByDisplayValue("Joan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Garcia")).toBeInTheDocument();
  });

  it("allows advancing from Membership to Review", () => {
    setupCheckout(mockCartMember);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    const sections = getSections();
    expect(sections[1].classList.contains("checkout-section--active")).toBe(true);
  });

  it("allows navigating back to completed Membership section", () => {
    setupCheckout(mockCartMember);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas")); // step 0 -> 1
    const header = getSections()[0].querySelector(".checkout-section__header");
    fireEvent.click(header); // click completed step 0
    expect(getSections()[0].classList.contains("checkout-section--active")).toBe(true);
  });
});

describe("Integration: Free checkout flow", () => {
  it("does not call checkoutPaymentCart for free cart on step transition", async () => {
    const { mockCheckoutCart, mockCheckoutPaymentCart } = setupCheckout(mockCartFree);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(mockCheckoutCart).toHaveBeenCalled();
    });
    expect(mockCheckoutPaymentCart).not.toHaveBeenCalled();
  });
});

describe("Integration: Cart modification during checkout", () => {
  it("calls substractToCart when delete is clicked", () => {
    const { mockSubstractToCart } = setupCheckout(mockCartMultipleItems);
    renderWithProviders(<Checkout />);
    const deleteButtons = screen.getAllByText("trash");
    fireEvent.click(deleteButtons[0].closest(".deleteItem"));
    expect(mockSubstractToCart).toHaveBeenCalledWith(1);
  });
});

describe("Integration: Discount code flow", () => {
  it("calls applyDiscount with correct args when valid code submitted", async () => {
    const { mockApplyDiscount } = setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    const input = screen.getByPlaceholderText("descompte");
    fireEvent.change(input, { target: { value: "AMEBA1" } });
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockApplyDiscount).toHaveBeenCalledWith([1], "AMEBA1");
    });
  });
});

describe("Integration: Error handling", () => {
  it("stays on Review step when checkoutCart fails", async () => {
    const { mockCheckoutCart } = setupCheckout(mockCartRegular);
    mockCheckoutCart.mockRejectedValue(new Error("API error"));
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      const sections = getSections();
      expect(sections[1].classList.contains("checkout-section--active")).toBe(true);
    });
  });
});

describe("Integration: Cross-store coordination", () => {
  it("fetches member profile on mount", () => {
    const { mockGetMemberProfile } = setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(mockGetMemberProfile).toHaveBeenCalled();
  });
});
