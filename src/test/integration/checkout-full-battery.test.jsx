// Intensive checkout battery: full flow (Review -> Payment -> Stripe),
// cart mutation mid-checkout, discount codes and step persistence, each run
// across the socio (member) / no-socio (non-member) x mobile / desktop matrix.
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../../components/checkout/Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useMediaQuery from "../../hooks/use-media-query";
import { toast } from "react-toastify";
import renderWithProviders from "../helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMultipleItems,
  mockCartMember,
  mockCartFree,
  mockCheckoutPaid,
  mockMemberProfile,
} from "../mocks/data";

const mockConfirmPayment = vi.fn();

vi.mock("../../hooks/use-media-query", () => ({ default: vi.fn() }));

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => ({ confirmPayment: mockConfirmPayment }),
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

const setupCheckout = (cartData, { member }) => {
  const mockCheckoutCart = vi.fn().mockResolvedValue();
  const mockCheckoutPaymentCart = vi.fn().mockResolvedValue(mockCheckoutPaid.checkout_stripe);
  const mockGetCart = vi.fn().mockResolvedValue();
  const mockGetMemberProfile = vi.fn().mockResolvedValue(mockMemberProfile);
  const mockSubstractToCart = vi.fn().mockResolvedValue();
  const mockApplyDiscount = vi.fn().mockResolvedValue({ ...cartData, total: "AMEBA1" });

  useAuthStore.setState({
    isLoggedIn: true,
    user_data: { member },
    user_member_data: mockMemberProfile,
    getMemberProfile: mockGetMemberProfile,
    updateMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
    createMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
  });

  useCartStore.setState({
    cart_data: cartData,
    checkout: {},
    checkoutCart: mockCheckoutCart,
    checkoutPaymentCart: mockCheckoutPaymentCart,
    getCart: mockGetCart,
    substractToCart: mockSubstractToCart,
    applyDiscount: mockApplyDiscount,
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

const MATRIX = [
  { label: "socio · mòbil", member: true, mobile: true },
  { label: "socio · escriptori", member: true, mobile: false },
  { label: "no soci · mòbil", member: false, mobile: true },
  { label: "no soci · escriptori", member: false, mobile: false },
];

describe.each(MATRIX)("Checkout battery: $label", ({ member, mobile }) => {
  beforeEach(() => {
    useMediaQuery.mockReturnValue(mobile);
    mockConfirmPayment.mockReset();
    window.scrollTo.mockClear();
    toast.error.mockClear();
  });

  it("starts on Review for a regular paid cart and reaches Payment after Next", async () => {
    setupCheckout(mockCartRegular, { member });
    renderWithProviders(<Checkout />);
    expect(getSections()[1].classList.contains("checkout-section--active")).toBe(true);

    fireEvent.click(screen.getByText("Ves al pagament"));
    await waitFor(() => {
      expect(getSections()[2].classList.contains("checkout-section--active")).toBe(true);
    });
  });

  it("only fetches the member profile when the logged-in user is a member", () => {
    const { mockGetMemberProfile } = setupCheckout(mockCartRegular, { member });
    renderWithProviders(<Checkout />);
    if (member) {
      expect(mockGetMemberProfile).toHaveBeenCalled();
    } else {
      expect(mockGetMemberProfile).not.toHaveBeenCalled();
    }
  });

  it("calls window.scrollTo on step navigation only when mobile", async () => {
    setupCheckout(mockCartRegular, { member });
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("Ves al pagament"));
    await waitFor(() => {
      expect(getSections()[2].classList.contains("checkout-section--active")).toBe(true);
    });
    if (mobile) {
      expect(window.scrollTo).toHaveBeenCalled();
    } else {
      expect(window.scrollTo).not.toHaveBeenCalled();
    }
  });

  it("completes Stripe payment successfully with no error toast", async () => {
    setupCheckout(mockCartRegular, { member });
    useCartStore.setState({ checkout: mockCheckoutPaid });
    mockConfirmPayment.mockResolvedValue({});
    renderWithProviders(<Checkout />);

    fireEvent.click(screen.getByText("Ves al pagament"));
    await waitFor(() => {
      expect(screen.getByTestId("stripe-elements")).toBeInTheDocument();
    });

    fireEvent.submit(screen.getByText("Paga").closest("form"));
    await waitFor(() => {
      expect(mockConfirmPayment).toHaveBeenCalled();
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("keeps the payment step open and toasts an error when Stripe declines the card", async () => {
    setupCheckout(mockCartRegular, { member });
    useCartStore.setState({ checkout: mockCheckoutPaid });
    mockConfirmPayment.mockResolvedValue({ error: { message: "Targeta rebutjada" } });
    renderWithProviders(<Checkout />);

    fireEvent.click(screen.getByText("Ves al pagament"));
    await waitFor(() => {
      expect(screen.getByTestId("stripe-elements")).toBeInTheDocument();
    });

    fireEvent.submit(screen.getByText("Paga").closest("form"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
    // Still on the payment section, ready to retry
    expect(getSections()[2].classList.contains("checkout-section--active")).toBe(true);
    expect(screen.getByTestId("payment-element")).toBeInTheDocument();
  });

  it("skips checkoutPaymentCart for a free cart", async () => {
    const { mockCheckoutCart, mockCheckoutPaymentCart } = setupCheckout(mockCartFree, { member });
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("Ves al pagament"));
    await waitFor(() => expect(mockCheckoutCart).toHaveBeenCalled());
    expect(mockCheckoutPaymentCart).not.toHaveBeenCalled();
  });

  it("removes the correct item from a multi-item cart mid-checkout", () => {
    const { mockSubstractToCart } = setupCheckout(mockCartMultipleItems, { member });
    renderWithProviders(<Checkout />);
    const deleteButtons = screen.getAllByTestId("icon-trash");
    fireEvent.click(deleteButtons[1].closest(".deleteItem"));
    expect(mockSubstractToCart).toHaveBeenCalledWith(2);
  });

  it("applies a discount code from the Review step", async () => {
    const { mockApplyDiscount } = setupCheckout(mockCartRegular, { member });
    renderWithProviders(<Checkout />);
    fireEvent.change(screen.getByPlaceholderText("descompte"), {
      target: { value: "AMEBA1" },
    });
    fireEvent.submit(screen.getByText("Aplica").closest("form"));
    await waitFor(() => {
      expect(mockApplyDiscount).toHaveBeenCalledWith([1], "AMEBA1");
    });
  });

  it("forces a subscription checkout back to the membership step on reload only when the user is not (yet) a member", () => {
    localStorage.setItem("checkoutStep", "1");
    setupCheckout(mockCartMember, { member });
    renderWithProviders(<Checkout />);
    if (member) {
      expect(getSections()[1].classList.contains("checkout-section--active")).toBe(true);
    } else {
      expect(getSections()[0].classList.contains("checkout-section--active")).toBe(true);
    }
  });
});
