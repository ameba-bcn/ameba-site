import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import DiscountCode from "./DiscountCode";
import useCartStore from "../../../stores/useCartStore";
import renderWithProviders from "../../../test/helpers/renderWithProviders";
import { mockCartRegular } from "../../../test/mocks/data";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

describe("DiscountCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders discount code input field", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<DiscountCode />);
    expect(screen.getByPlaceholderText("descompte")).toBeInTheDocument();
  });

  it("renders submit button with Aplica text", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<DiscountCode />);
    expect(screen.getByText("Aplica")).toBeInTheDocument();
  });

  it("shows required error when submitting empty form", async () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<DiscountCode />);
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      // Should show the discount required error from constants
      expect(screen.getByText(/obligatori/i)).toBeInTheDocument();
    });
  });

  it("shows format error for code shorter than 6 chars", async () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<DiscountCode />);
    const input = screen.getByPlaceholderText("descompte");
    fireEvent.change(input, { target: { value: "ABC" } });
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText(/longitud/i)).toBeInTheDocument();
    });
  });

  it("calls applyDiscount with correct args when valid code submitted", async () => {
    const mockApplyDiscount = vi.fn().mockResolvedValue();
    useCartStore.setState({
      cart_data: mockCartRegular,
      applyDiscount: mockApplyDiscount,
    });
    renderWithProviders(<DiscountCode />);
    const input = screen.getByPlaceholderText("descompte");
    fireEvent.change(input, { target: { value: "ABC123" } });
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockApplyDiscount).toHaveBeenCalledWith([1], "ABC123");
    });
  });
});
