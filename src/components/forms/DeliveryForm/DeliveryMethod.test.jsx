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

  it("renders both delivery method tiles", () => {
    useCartStore.setState({
      cart_data: mockCartRegular,
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);
    expect(screen.getByText(/Recollida/)).toBeInTheDocument();
    expect(screen.getAllByText(/Enviament/).length).toBeGreaterThan(0);
  });

  it("lists both pickup points when pickup is selected", () => {
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);
    expect(screen.getByText("Trama Serigrafia")).toBeInTheDocument();
    expect(screen.getByText("La Merla")).toBeInTheDocument();
  });

  it("shows the coverage note and address form when shipping is selected", () => {
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);

    fireEvent.click(screen.getAllByText("Enviament")[0]);

    expect(document.getElementById("shipping_name")).toBeInTheDocument();
    expect(document.getElementById("shipping_address")).toBeInTheDocument();
    expect(document.getElementById("shipping_postal_code")).toBeInTheDocument();
    expect(document.getElementById("shipping_city")).toBeInTheDocument();
  });

  it("auto-saves the shipping address once every field is valid and blurred", async () => {
    const mockSetDeliveryMethod = vi.fn().mockResolvedValue();
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: mockSetDeliveryMethod,
    });
    renderWithProviders(<DeliveryMethod />);

    fireEvent.click(screen.getAllByText("Enviament")[0]);

    fireEvent.change(document.getElementById("shipping_name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.blur(document.getElementById("shipping_name"));
    fireEvent.change(document.getElementById("shipping_address"), {
      target: { value: "Carrer Fictici, 1" },
    });
    fireEvent.blur(document.getElementById("shipping_address"));
    fireEvent.change(document.getElementById("shipping_postal_code"), {
      target: { value: "08001" },
    });
    fireEvent.blur(document.getElementById("shipping_postal_code"));
    fireEvent.change(document.getElementById("shipping_city"), {
      target: { value: "Barcelona" },
    });
    fireEvent.blur(document.getElementById("shipping_city"));

    await waitFor(
      () => {
        expect(mockSetDeliveryMethod).toHaveBeenCalledWith({
          delivery_method: "shipping",
          shipping_name: "Jane Doe",
          shipping_address: "Carrer Fictici, 1",
          shipping_postal_code: "08001",
          shipping_city: "Barcelona",
        });
      },
      { timeout: 2000 },
    );
  });

  it("shows a zone-aware error and a switch-to-pickup link for an out-of-coverage postal code", async () => {
    useCartStore.setState({
      cart_data: { ...mockCartRegular, delivery_method: "pickup", pickup_location: "trama" },
      setDeliveryMethod: vi.fn().mockResolvedValue(),
    });
    renderWithProviders(<DeliveryMethod />);

    fireEvent.click(screen.getAllByText("Enviament")[0]);

    fireEvent.change(document.getElementById("shipping_postal_code"), {
      target: { value: "07001" },
    });
    fireEvent.blur(document.getElementById("shipping_postal_code"));

    await waitFor(() => {
      expect(screen.getByText(/07001/)).toBeInTheDocument();
      expect(screen.getByText("Canvia a Recollida")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Canvia a Recollida"));
    expect(document.getElementById("shipping_name")).not.toBeInTheDocument();
  });
});
