import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
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

vi.mock("../forms/Payment/PaymentForm", () => ({
  default: ({ disabled }) => (
    <div data-testid="payment-form" data-disabled={disabled ? "true" : "false"}>
      PaymentForm
    </div>
  ),
}));

describe("Payment", () => {
  it("renders FreeCheckout when amount is 0", () => {
    useCartStore.setState({
      cart_data: mockCartFree,
      checkout: mockCheckoutFree,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByTestId("free-checkout")).toBeInTheDocument();
  });

  it("does not show the terms checkbox for a free checkout", () => {
    useCartStore.setState({
      cart_data: mockCartFree,
      checkout: mockCheckoutFree,
    });
    renderWithProviders(<Payment />);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
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
    expect(container.querySelector(".spinner-mark")).toBeInTheDocument();
  });

  it("does not render FreeCheckout when amount > 0", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.queryByTestId("free-checkout")).not.toBeInTheDocument();
  });

  it("keeps PaymentForm disabled until the terms checkbox is checked", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(screen.getByTestId("payment-form")).toHaveAttribute("data-disabled", "true");
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByTestId("payment-form")).toHaveAttribute("data-disabled", "false");
  });

  it("renders spinner when stripe_public is present but client_secret is missing", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: { amount: 2500, checkout_stripe: { stripe_public: "pk_123" } },
    });
    const { container } = renderWithProviders(<Payment />);
    expect(container.querySelector(".spinner-mark")).toBeInTheDocument();
    expect(screen.queryByTestId("stripe-elements")).not.toBeInTheDocument();
  });

  it("renders spinner when client_secret is present but stripe_public is missing", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: { amount: 2500, checkout_stripe: { client_secret: "pi_123" } },
    });
    const { container } = renderWithProviders(<Payment />);
    expect(container.querySelector(".spinner-mark")).toBeInTheDocument();
    expect(screen.queryByTestId("stripe-elements")).not.toBeInTheDocument();
  });

  it("calls loadStripe with the stripe_public key from the checkout", async () => {
    const { loadStripe } = await import("@stripe/stripe-js");
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    renderWithProviders(<Payment />);
    expect(loadStripe).toHaveBeenCalledWith(mockCheckoutPaid.checkout_stripe.stripe_public);
  });

  it("shows the secure-payment note and terms link only for a paid checkout", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      checkout: mockCheckoutPaid,
    });
    const { rerender } = renderWithProviders(<Payment />);
    expect(document.querySelector(".payment-secure-note")).toBeInTheDocument();

    useCartStore.setState({ cart_data: mockCartFree, checkout: mockCheckoutFree });
    rerender(<Payment />);
    expect(document.querySelector(".payment-secure-note")).not.toBeInTheDocument();
  });
});
