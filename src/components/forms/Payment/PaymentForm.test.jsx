import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import renderWithProviders from "../../../test/helpers/renderWithProviders";

const mockConfirmPayment = vi.fn();
const mockStripe = { confirmPayment: mockConfirmPayment };
const mockElements = {};

vi.mock("@stripe/react-stripe-js", () => ({
  PaymentElement: (props) => <div data-testid="payment-element" />,
  useStripe: () => mockStripe,
  useElements: () => mockElements,
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

describe("PaymentForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
          return_url: expect.stringContaining("/summary-checkout"),
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
});
