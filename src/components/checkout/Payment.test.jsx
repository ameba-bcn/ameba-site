import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Payment from "./Payment";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartRegular, mockCartFree, mockCheckoutPaid, mockCheckoutFree } from "../../test/mocks/data";

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => ({ confirmPayment: vi.fn() }),
  useElements: () => ({}),
}));

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn().mockResolvedValue({}),
}));

vi.mock("./FreeCheckout", () => ({
  default: () => <div data-testid="free-checkout">FreeCheckout</div>,
}));

vi.mock("./MiniTableProducts", () => ({
  default: () => <div data-testid="mini-table">MiniTableProducts</div>,
}));

vi.mock("../forms/Payment/PaymentForm", () => ({
  default: () => <div data-testid="payment-form">PaymentForm</div>,
}));

describe("Payment", () => {
  it("renders MiniTableProducts", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByTestId("mini-table")).toBeInTheDocument();
  });

  it("renders total price", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
  });

  it("renders FreeCheckout when amount is 0", () => {
    useCartStore.setState({
      cart_data: mockCartFree,
      checkout: mockCheckoutFree,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByTestId("free-checkout")).toBeInTheDocument();
  });

  it("renders Stripe Elements when amount > 0 and stripe ready", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByTestId("stripe-elements")).toBeInTheDocument();
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();
  });

  it("renders spinner when stripe not ready", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: { amount: 2500, checkout_stripe: {} },
    });
    const { container } = renderWithProviders(<Payment />);
    expect(container.querySelector(".spinner-border")).toBeInTheDocument();
  });

  it("does not render FreeCheckout when amount > 0", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.queryByTestId("free-checkout")).not.toBeInTheDocument();
  });
});
