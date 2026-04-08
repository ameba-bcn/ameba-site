import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import FreeCheckout from "./FreeCheckout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useUIStore from "../../stores/useUIStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartFree } from "../../test/mocks/data";

describe("FreeCheckout", () => {
  const setupMocks = () => {
    const mockCheckoutPaymentCart = vi.fn().mockResolvedValue();
    const mockGetCart = vi.fn().mockResolvedValue();
    const mockGetMemberProfile = vi.fn().mockResolvedValue();
    const mockCloseFullscreen = vi.fn();

    useCartStore.setState({
      cart_data: mockCartFree,
      checkoutPaymentCart: mockCheckoutPaymentCart,
      getCart: mockGetCart,
    });
    useAuthStore.setState({
      getMemberProfile: mockGetMemberProfile,
    });
    useUIStore.setState({
      closeFullscreen: mockCloseFullscreen,
    });

    return { mockCheckoutPaymentCart, mockGetCart, mockGetMemberProfile, mockCloseFullscreen };
  };

  it("renders free checkout text", () => {
    setupMocks();
    renderWithProviders(<FreeCheckout />);
    // Catalan translation: checkout.pagament-gratis
    expect(screen.getByText(/no suposa cap càrreg/i)).toBeInTheDocument();
  });

  it("renders finalitza button", () => {
    setupMocks();
    renderWithProviders(<FreeCheckout />);
    expect(screen.getByText("finalitza")).toBeInTheDocument();
  });

  it("calls checkoutPaymentCart on button click", () => {
    const { mockCheckoutPaymentCart } = setupMocks();
    renderWithProviders(<FreeCheckout />);
    fireEvent.click(screen.getByText("finalitza"));
    expect(mockCheckoutPaymentCart).toHaveBeenCalledWith("cart-uuid-789");
  });

  it("calls getMemberProfile after successful checkout", async () => {
    const { mockGetMemberProfile } = setupMocks();
    renderWithProviders(<FreeCheckout />);
    fireEvent.click(screen.getByText("finalitza"));
    await vi.waitFor(() => {
      expect(mockGetMemberProfile).toHaveBeenCalled();
    });
  });

  it("calls getCart after successful checkout", async () => {
    const { mockGetCart } = setupMocks();
    renderWithProviders(<FreeCheckout />);
    fireEvent.click(screen.getByText("finalitza"));
    await vi.waitFor(() => {
      expect(mockGetCart).toHaveBeenCalled();
    });
  });

  it("calls closeFullscreen after successful checkout", async () => {
    const { mockCloseFullscreen } = setupMocks();
    renderWithProviders(<FreeCheckout />);
    fireEvent.click(screen.getByText("finalitza"));
    await vi.waitFor(() => {
      expect(mockCloseFullscreen).toHaveBeenCalled();
    });
  });
});
