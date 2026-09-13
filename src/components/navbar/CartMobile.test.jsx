import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import CartMobile from "./CartMobile";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useProfileStore from "../../stores/useProfileStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMultipleItems,
  mockCartMultipleUnits,
  mockCartMemberProduct,
} from "../../test/mocks/data";

const setup = (cartData, { isLoggedIn = false } = {}) => {
  const addToCart = vi.fn().mockResolvedValue();
  const substractToCart = vi.fn().mockResolvedValue();

  useAuthStore.setState({ isLoggedIn });
  useCartStore.setState({ cart_data: cartData, addToCart, substractToCart, cartBusy: false });

  return { addToCart, substractToCart };
};

describe("CartMobile - render gating", () => {
  it("renders nothing when the cart is empty", () => {
    setup({ item_variants: [] });
    const { container } = renderWithProviders(<CartMobile />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders items when the cart has content", () => {
    setup(mockCartRegular);
    renderWithProviders(<CartMobile />);
    expect(screen.getByText("Ameba T-shirt")).toBeInTheDocument();
  });
});

describe("CartMobile - add item", () => {
  it("calls addToCart with the item id when + is clicked (guest / no-socio)", () => {
    const { addToCart } = setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Suma una unitat"));
    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it("calls addToCart with the item id when + is clicked (logged-in socio)", () => {
    const { addToCart } = setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Suma una unitat"));
    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it("disables the + button while cartBusy is true", () => {
    setup(mockCartRegular);
    useCartStore.setState({ cartBusy: true });
    renderWithProviders(<CartMobile />);
    expect(screen.getByLabelText("Suma una unitat")).toBeDisabled();
  });

  it("reflects quantity for repeated units of the same item", () => {
    setup(mockCartMultipleUnits);
    const { container } = renderWithProviders(<CartMobile />);
    expect(container.querySelector(".cart-pop__qty-value")).toHaveTextContent("2");
  });
});

describe("CartMobile - remove item", () => {
  it("calls substractToCart with the item id when − is clicked", () => {
    const { substractToCart } = setup(mockCartRegular);
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(substractToCart).toHaveBeenCalledWith(1);
  });

  it("removes only the matching item id in a multi-item cart", () => {
    const { substractToCart } = setup(mockCartMultipleItems);
    renderWithProviders(<CartMobile />);
    const minusButtons = screen.getAllByLabelText("Resta una unitat");
    fireEvent.click(minusButtons[1]);
    expect(substractToCart).toHaveBeenCalledWith(2);
  });

  it("disables the − button while cartBusy is true", () => {
    setup(mockCartRegular);
    useCartStore.setState({ cartBusy: true });
    renderWithProviders(<CartMobile />);
    expect(screen.getByLabelText("Resta una unitat")).toBeDisabled();
  });
});

describe("CartMobile - checkout link target for socio vs no-socio", () => {
  it("points to /inicia-sessio for a guest (no-socio)", () => {
    setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<CartMobile />);
    expect(screen.getByText("finalitzar compra").closest("a")).toHaveAttribute(
      "href",
      "/inicia-sessio",
    );
  });

  it("points to /pagament for a logged-in user (socio)", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<CartMobile />);
    expect(screen.getByText("finalitzar compra").closest("a")).toHaveAttribute(
      "href",
      "/pagament",
    );
  });

  it("marks the profile store LOGGED when a logged-in user checks out", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByText("finalitzar compra"));
    expect(useProfileStore.getState().user_profile).toBe("LOGGED");
  });

  it("marks the profile store GUEST when a guest checks out", () => {
    setup(mockCartRegular, { isLoggedIn: false });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByText("finalitzar compra"));
    expect(useProfileStore.getState().user_profile).toBe("GUEST");
  });
});

describe("CartMobile - removing a membership product updates the profile store", () => {
  it("marks LOGGED when a logged-in user removes a membership item (id 26/27)", () => {
    setup(mockCartMemberProduct, { isLoggedIn: true });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("LOGGED");
  });

  it("marks GUEST when a guest removes a membership item (id 26/27)", () => {
    setup(mockCartMemberProduct, { isLoggedIn: false });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("GUEST");
  });

  it("does not touch the profile store when removing a non-membership item", () => {
    setup(mockCartRegular, { isLoggedIn: true });
    renderWithProviders(<CartMobile />);
    fireEvent.click(screen.getByLabelText("Resta una unitat"));
    expect(useProfileStore.getState().user_profile).toBe("");
  });
});
