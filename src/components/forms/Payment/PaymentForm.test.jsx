import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import renderWithProviders from "../../../test/helpers/renderWithProviders";

const retrievePaymentIntent = vi.fn();
let loadError = false;

vi.mock("@stripe/react-stripe-js", () => ({
  PaymentElement: ({ onLoadError }) => {
    if (loadError) onLoadError?.({});
    return <div data-testid="payment-element" />;
  },
  useStripe: () => ({ retrievePaymentIntent, confirmPayment: vi.fn() }),
  useElements: () => ({}),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("PaymentForm - resumed payment", () => {
  beforeEach(() => {
    retrievePaymentIntent.mockReset();
    mockNavigate.mockReset();
    loadError = false;
  });

  it("sends an already-paid PaymentIntent to the order summary", async () => {
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "succeeded" } });
    renderWithProviders(<PaymentForm clientSecret="pi_1_secret" />);
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(
        "/resum-comanda?payment_intent_client_secret=pi_1_secret&redirect_status=succeeded",
      ),
    );
  });

  it("reports a canceled PaymentIntent as unavailable", async () => {
    const onUnavailable = vi.fn();
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "canceled" } });
    renderWithProviders(<PaymentForm clientSecret="pi_1_secret" onUnavailable={onUnavailable} />);
    await waitFor(() => expect(onUnavailable).toHaveBeenCalled());
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("leaves a payable PaymentIntent alone", async () => {
    const onUnavailable = vi.fn();
    retrievePaymentIntent.mockResolvedValue({ paymentIntent: { status: "requires_payment_method" } });
    renderWithProviders(<PaymentForm clientSecret="pi_1_secret" onUnavailable={onUnavailable} />);
    await waitFor(() => expect(retrievePaymentIntent).toHaveBeenCalled());
    expect(onUnavailable).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("reports unavailable when the Payment Element fails to load", () => {
    const onUnavailable = vi.fn();
    loadError = true;
    retrievePaymentIntent.mockResolvedValue({});
    renderWithProviders(<PaymentForm clientSecret="pi_1_secret" onUnavailable={onUnavailable} />);
    expect(onUnavailable).toHaveBeenCalled();
  });
});
