import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutFinished from "./CheckoutFinished";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartRegular, mockCheckoutPaid } from "../../test/mocks/data";

const retrievePaymentIntent = vi.fn();

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn(() => Promise.resolve({ retrievePaymentIntent })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

const returnUrl = (redirectStatus) =>
  `/resum-comanda?payment_intent=pi_1&payment_intent_client_secret=pi_1_secret&redirect_status=${redirectStatus}`;

describe("CheckoutFinished", () => {
  beforeEach(() => {
    retrievePaymentIntent.mockReset();
    mockNavigate.mockReset();
    useCartStore.setState({ cart_data: mockCartRegular, checkout: mockCheckoutPaid });
  });

  it("shows success and clears the cart when there is no payment in the URL (free checkout)", () => {
    renderWithProviders(<CheckoutFinished />, { route: "/resum-comanda" });
    expect(screen.getByText("Gràcies.")).toBeInTheDocument();
    expect(useCartStore.getState().cart_data).toEqual({});
  });

  it("trusts the PaymentIntent status over redirect_status", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "requires_payment_method" } });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("succeeded") });
    expect(await screen.findByText("No s'ha pogut cobrar.")).toBeInTheDocument();
    expect(retrievePaymentIntent).toHaveBeenCalledWith("pi_1_secret");
  });

  it("shows success and clears the pending payment when the PaymentIntent succeeded", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "succeeded" } });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("succeeded") });
    expect(await screen.findByText("Gràcies.")).toBeInTheDocument();
    await waitFor(() => expect(useCartStore.getState().checkout).toEqual({}));
  });

  it("shows the processing state without offering a retry", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "processing" } });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("processing") });
    expect(await screen.findByText("Gairebé fet.")).toBeInTheDocument();
    expect(screen.queryByText("Torna-ho a provar")).not.toBeInTheDocument();
  });

  it("keeps the pending payment on failure and retries from the payment step", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "requires_payment_method" } });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("failed") });
    fireEvent.click(await screen.findByText("Torna-ho a provar"));
    expect(useCartStore.getState().checkout).toEqual(mockCheckoutPaid);
    expect(localStorage.getItem("checkoutStep")).toBe("2");
    expect(mockNavigate).toHaveBeenCalledWith("/pagament");
  });

  it("falls back to redirect_status when the Stripe key is not available", async () => {
    useCartStore.setState({ checkout: {} });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("failed") });
    expect(await screen.findByText("No s'ha pogut cobrar.")).toBeInTheDocument();
    expect(retrievePaymentIntent).not.toHaveBeenCalled();
  });

  it("drops a canceled payment and sends the retry back to the cart review step", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "canceled" } });
    renderWithProviders(<CheckoutFinished />, { route: returnUrl("failed") });
    fireEvent.click(await screen.findByText("Torna-ho a provar"));
    expect(useCartStore.getState().checkout).toEqual({});
    expect(localStorage.getItem("checkoutStep")).toBe("1");
  });
});
