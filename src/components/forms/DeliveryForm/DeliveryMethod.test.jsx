import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import DeliveryMethod from "./DeliveryMethod";
import useCartStore from "../../../stores/useCartStore";
import renderWithProviders from "../../../test/helpers/renderWithProviders";
import { mockCartRegular, mockCartMember } from "../../../test/mocks/data";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

describe("DeliveryMethod", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing for a cart with no articles", () => {
    useCartStore.setState({ cart_data: mockCartMember });
    const { container } = renderWithProviders(<DeliveryMethod />);
    expect(container).toBeEmptyDOMElement();
  });

  it("auto-saves pickup at the first location when no delivery_method is set yet", async () => {
    const mockSetDeliveryMethod = vi.fn().mockResolvedValue();
    useCartStore.setState({
      cart_data: mockCartRegular,
      setDeliveryMethod: mockSetDeliveryMethod,
    });
    renderWithProviders(<DeliveryMethod />);
    await waitFor(() => {
      expect(mockSetDeliveryMethod).toHaveBeenCalledWith({
        delivery_method: "pickup",
        pickup_location: "trama",
      });
    });
  });

  it("renders both delivery method options", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);
    expect(screen.getByText(/Recollida/)).toBeInTheDocument();
    expect(screen.getByText(/Enviament/)).toBeInTheDocument();
  });

  it("shows the address form and saves it when shipping is selected and submitted", async () => {
    const mockSetDeliveryMethod = vi.fn().mockResolvedValue();
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: mockSetDeliveryMethod,
    });
    renderWithProviders(<DeliveryMethod />);

    fireEvent.click(screen.getByText(/Enviament/));

    fireEvent.change(document.getElementById("shipping_name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(document.getElementById("shipping_address"), {
      target: { value: "Carrer Fictici, 1" },
    });
    fireEvent.change(document.getElementById("shipping_postal_code"), {
      target: { value: "08001" },
    });
    fireEvent.change(document.getElementById("shipping_city"), {
      target: { value: "Barcelona" },
    });

    fireEvent.click(screen.getByText("Desa l'adreça"));

    await waitFor(() => {
      expect(mockSetDeliveryMethod).toHaveBeenCalledWith({
        delivery_method: "shipping",
        shipping_name: "Jane Doe",
        shipping_address: "Carrer Fictici, 1",
        shipping_postal_code: "08001",
        shipping_city: "Barcelona",
      });
    });
  });

  it("shows validation errors when submitting an incomplete shipping address", async () => {
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);

    fireEvent.click(screen.getByText(/Enviament/));
    fireEvent.click(screen.getByText("Desa l'adreça"));

    await waitFor(() => {
      expect(screen.getAllByText(/obligatori/i).length).toBeGreaterThan(0);
    });
  });
});
