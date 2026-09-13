import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useProfileStore from "../../stores/useProfileStore";
import useUIStore from "../../stores/useUIStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMultipleItems,
  mockCartMultipleUnits,
  mockCartMemberProduct,
} from "../../test/mocks/data";

vi.mock("../ui/Icon", () => ({
  default: (props) => <span data-testid={`icon-${props.icon}`}>{props.icon}</span>,
}));

const setup = (cartData, { isLoggedIn = false } = {}) => {
  const addToCart = vi.fn().mockResolvedValue();
  const substractToCart = vi.fn().mockResolvedValue();

  useAuthStore.setState({ isLoggedIn });
  useCartStore.setState({ cart_data: cartData, addToCart, substractToCart, cartBusy: false });
  useUIStore.setState({ isCartMenuOpen: true });

  return { addToCart, substractToCart };
};

describe("Cart (desktop dropdown) - render gating", () => {
  it("renders nothing when the cart is empty", () => {
    setup({ item_variants: [] });
    const { container } = renderWithProviders(<Cart />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders items when the cart has content", () => {
    setup(mockCartRegular);
    renderWithProviders(<Cart />);
    expect(screen.getByText("Ameba T-shirt")).toBeInTheDocument();
  });
});

describe("Cart (desktop dropdown) - add item", () => {
  it("calls addToCart with the item id when + is clicked (guest / no-socio)", () => {
    const { addToCart } = setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Suma una unitat"));
    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it("calls addToCart with the item id when + is clicked (logged-in socio)", () => {
    const { addToCart } = setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Suma una unitat"));
    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it("disables the + button while cartBusy is true", () => {
    setup(mockCartRegular);
    useCartStore.setState({ cartBusy: true });
    renderWithProviders(<Cart />);
    expect(screen.getByLabelText("Suma una unitat")).toBeDisabled();
  });

  it("reflects quantity for repeated units of the same item", () => {
    setup(mockCartMultipleUnits);
    const { container } = renderWithProviders(<Cart />);
    expect(container.querySelector(".cart-pop__qty-value")).toHaveTextContent("2");
  });
});

describe("Cart (desktop dropdown) - remove item", () => {
  it("calls substractToCart with the item id when − is clicked", () => {
    const { substractToCart } = setup(mockCartRegular);
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(substractToCart).toHaveBeenCalledWith(1);
  });

  it("removes only the matching item id in a multi-item cart", () => {
    const { substractToCart } = setup(mockCartMultipleItems);
    renderWithProviders(<Cart />);
    const minusButtons = screen.getAllByLabelText("Resta una unitat");
    fireEvent.click(minusButtons[1]);
    expect(substractToCart).toHaveBeenCalledWith(2);
  });

  it("disables the − button while cartBusy is true", () => {
    setup(mockCartRegular);
    useCartStore.setState({ cartBusy: true });
    renderWithProviders(<Cart />);
    expect(screen.getByLabelText("Resta una unitat")).toBeDisabled();
  });
});

describe("Cart (desktop dropdown) - checkout link target for socio vs no-socio", () => {
  it("points to /inicia-sessio for a guest (no-socio)", () => {
    setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<Cart />);
    expect(screen.getByText("finalitzar compra").closest("a")).toHaveAttribute(
      "href",
      "/inicia-sessio",
    );
  });

  it("points to /pagament for a logged-in user (socio)", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<Cart />);
    expect(screen.getByText("finalitzar compra").closest("a")).toHaveAttribute(
      "href",
      "/pagament",
    );
  });

  it("marks the profile store LOGGED when a logged-in user checks out", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByText("finalitzar compra"));
    expect(useProfileStore.getState().user_profile).toBe("LOGGED");
  });

  it("marks the profile store GUEST when a guest checks out", () => {
    setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByText("finalitzar compra"));
    expect(useProfileStore.getState().user_profile).toBe("GUEST");
  });
});

describe("Cart (desktop dropdown) - removing a membership product updates the profile store", () => {
  it("marks LOGGED when a logged-in user removes a membership item (id 26/27)", () => {
    setup(mockCartMemberProduct, { isLoggedIn: true });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("LOGGED");
  });

  it("marks GUEST when a guest removes a membership item (id 26/27)", () => {
    setup(mockCartMemberProduct, { isLoggedIn: false });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("GUEST");
  });

  it("does not touch the profile store when removing a non-membership item", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("");
  });
});
