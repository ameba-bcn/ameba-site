import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../../components/checkout/Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useUIStore from "../../stores/useUIStore";
import renderWithProviders from "../helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMember,
  mockCartFree,
  mockCartMultipleItems,
  mockCartDiscounted,
  mockMemberProfile,
  mockCheckoutPaid,
  mockCheckoutFree,
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

const setupCheckout = (cartData, extraCartState = {}) => {
  const mockCheckoutCart = vi.fn().mockResolvedValue();
  const mockCheckoutPaymentCart = vi.fn().mockResolvedValue();
  const mockGetCart = vi.fn().mockResolvedValue();
  const mockGetMemberProfile = vi.fn().mockResolvedValue(mockMemberProfile);
  const mockSubstractToCart = vi.fn().mockResolvedValue();
  const mockApplyDiscount = vi.fn().mockResolvedValue(mockCartDiscounted);
  const mockCloseFullscreen = vi.fn();

  useAuthStore.setState({
    isLoggedIn: true,
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

  useUIStore.setState({
    closeFullscreen: mockCloseFullscreen,
    openFullscreen: vi.fn(),
  });

  return {
    mockCheckoutCart,
    mockCheckoutPaymentCart,
    mockGetCart,
    mockGetMemberProfile,
    mockSubstractToCart,
    mockApplyDiscount,
    mockCloseFullscreen,
  };
};

describe("Integration: Regular checkout (no subscription, paid)", () => {
  it("starts at Review step for regular cart", () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    // Subtitle shows "Cistella" at step 1
    const subtitle = document.querySelector(".checkout-subtitle");
    expect(subtitle.textContent).toBe("Cistella");
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("displays cart items in Review", () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByText(/Ameba T-shirt/)).toBeInTheDocument();
  });

  it("advances to Payment step on Next click", async () => {
    setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByText("Dades de pagament")).toBeInTheDocument();
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
      expect(screen.getByText("Dades de pagament")).toBeInTheDocument();
    });
  });
});

describe("Integration: Subscription checkout", () => {
  it("starts at Membership step for subscription cart", () => {
    setupCheckout(mockCartMember);
    renderWithProviders(<Checkout />);
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
    expect(screen.getByText("Cistella")).toBeInTheDocument();
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
      expect(screen.getByText("Cistella")).toBeInTheDocument();
    });
  });
});

describe("Integration: Cross-store coordination", () => {
  it("fetches member profile on mount", () => {
    const { mockGetMemberProfile } = setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(mockGetMemberProfile).toHaveBeenCalled();
  });

  it("calls closeFullscreen and getCart on Exit at payment step", async () => {
    const { mockCloseFullscreen, mockGetCart } = setupCheckout(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByText("Dades de pagament")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("sortir"));
    expect(mockCloseFullscreen).toHaveBeenCalled();
    expect(mockGetCart).toHaveBeenCalled();
  });
});
