import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import renderWithProviders from "../../../test/helpers/renderWithProviders";

const mockConfirmPayment = vi.fn();
const mockStripe = { confirmPayment: mockConfirmPayment };
const mockElements = {};

vi.mock("@stripe/react-stripe-js", () => ({
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => mockStripe,
  useElements: () => mockElements,
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

// notificationToast() passes toast.error a lazily-evaluated finalMessage
// function rather than a plain string — unwrap it to assert content.
const lastToastMessage = (mock) => mock.mock.calls.at(-1)[0]();

describe("PaymentForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    mockConfirmPayment.mockReset();
  });

  it("renders PaymentElement", () => {
    renderWithProviders(<PaymentForm />);
    expect(screen.getByTestId("payment-element")).toBeInTheDocument();
  });

  it("renders Paga button", () => {
    renderWithProviders(<PaymentForm />);
    expect(screen.getByText("Paga")).toBeInTheDocument();
  });

  it("calls stripe.confirmPayment on form submit", async () => {
    mockConfirmPayment.mockResolvedValue({});
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockConfirmPayment).toHaveBeenCalledWith({
        elements: mockElements,
        confirmParams: {
          return_url: expect.stringContaining("/resum-comanda"),
        },
      });
    });
  });

  it("shows error toast when payment fails", async () => {
    mockConfirmPayment.mockResolvedValue({ error: { message: "Card declined" } });
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    const { toast } = await import("react-toastify");
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("does not call confirmPayment when stripe has not loaded yet", async () => {
    const mockUseStripe = await import("@stripe/react-stripe-js");
    vi.spyOn(mockUseStripe, "useStripe").mockReturnValue(null);
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  it("does not call confirmPayment when elements has not loaded yet", async () => {
    const mockUseStripe = await import("@stripe/react-stripe-js");
    vi.spyOn(mockUseStripe, "useElements").mockReturnValue(null);
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  it("disables the submit button and shows a spinner while the payment is processing", async () => {
    let resolveConfirm;
    mockConfirmPayment.mockImplementation(
      () => new Promise((resolve) => { resolveConfirm = resolve; }),
    );
    const { container } = renderWithProviders(<PaymentForm />);
    const form = container.querySelector("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector("#submit")).toBeDisabled();
    });
    // Button swaps its label for a spinner while processing=true
    expect(screen.queryByText("Paga")).not.toBeInTheDocument();

    resolveConfirm({});
  });

  it("re-enables the submit button after a failed payment so the user can retry", async () => {
    mockConfirmPayment.mockResolvedValue({ error: { message: "Card declined" } });
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText("Paga").closest("button")).not.toBeDisabled();
    });
  });

  it("keeps the submit button disabled while the disabled prop is true (terms not accepted)", () => {
    renderWithProviders(<PaymentForm disabled={true} />);
    expect(screen.getByText("Paga").closest("button")).toBeDisabled();
  });

  it("does not call confirmPayment when clicking a button disabled via the disabled prop", async () => {
    renderWithProviders(<PaymentForm disabled={true} />);
    fireEvent.click(screen.getByText("Paga").closest("button"));
    await waitFor(() => {
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  it("does not toast an error on a successful payment", async () => {
    mockConfirmPayment.mockResolvedValue({});
    renderWithProviders(<PaymentForm />);
    const form = screen.getByText("Paga").closest("form");
    fireEvent.submit(form);
    const { toast } = await import("react-toastify");
    await waitFor(() => {
      expect(mockConfirmPayment).toHaveBeenCalled();
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  describe.each([
    { label: "card declined", message: "Your card was declined." },
    { label: "insufficient funds", message: "Your card has insufficient funds." },
    { label: "expired card", message: "Your card has expired." },
    { label: "processing error", message: "An error occurred while processing your card." },
    { label: "3D Secure authentication failed", message: "We are unable to authenticate your payment method." },
  ])("Stripe error scenario: $label", ({ message }) => {
    it(`surfaces "${message}" via toast and leaves the form open for retry`, async () => {
      mockConfirmPayment.mockResolvedValue({ error: { message } });
      renderWithProviders(<PaymentForm />);
      const form = screen.getByText("Paga").closest("form");
      fireEvent.submit(form);
      const { toast } = await import("react-toastify");
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
      expect(lastToastMessage(toast.error)).toBe(message);
      // Form stays mounted (PaymentElement still there) so the user can retry
      expect(screen.getByTestId("payment-element")).toBeInTheDocument();
      expect(screen.getByText("Paga").closest("button")).not.toBeDisabled();
    });
  });
});
