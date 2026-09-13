import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import CheckoutSummary from "./CheckoutSummary";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import {
  mockCartRegular,
  mockCartMultipleItems,
  mockCartDiscounted,
} from "../../test/mocks/data";

describe("CheckoutSummary - item list", () => {
  it("renders one row per item with its name and price", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<CheckoutSummary />);
    expect(screen.getByText("Ameba T-shirt")).toBeInTheDocument();
    expect(screen.getByText("Ameba Vinyl")).toBeInTheDocument();
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
    expect(screen.getByText("30.00 €")).toBeInTheDocument();
  });

  it("renders no item rows for an empty cart", () => {
    useCartStore.setState({ cart_data: { item_variants: [], total: "0.00 €" } });
    const { container } = renderWithProviders(<CheckoutSummary />);
    expect(container.querySelectorAll(".checkout-summary__item")).toHaveLength(0);
  });

  it("renders the total", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    const { container } = renderWithProviders(<CheckoutSummary />);
    expect(container.querySelector(".checkout-summary__total-value")).toHaveTextContent(
      "25.00 €",
    );
  });
});

describe("CheckoutSummary - discount computation", () => {
  it("shows no discount row when no item has a discount", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    const { container } = renderWithProviders(<CheckoutSummary />);
    expect(
      container.querySelector(".checkout-summary__row--discount"),
    ).not.toBeInTheDocument();
  });

  it("shows the savings and discount name when a discount is present", () => {
    useCartStore.setState({ cart_data: mockCartDiscounted });
    const { container } = renderWithProviders(<CheckoutSummary />);
    const row = container.querySelector(".checkout-summary__row--discount");
    expect(row).toBeInTheDocument();
    expect(row).toHaveTextContent("AMEBA20");
    // price 25.00 - subtotal 20.00 = 5.00 savings
    expect(container.querySelector(".checkout-summary__discount-value")).toHaveTextContent(
      "5€",
    );
  });

  it("does not show a discount row when discount_name is present but price equals subtotal (zero savings)", () => {
    useCartStore.setState({
      cart_data: {
        total: "25.00 €",
        item_variants: [
          {
            id: 1,
            item_name: "Ameba T-shirt",
            price: "25.00 €",
            subtotal: "25.00 €",
            discount_value: null,
            discount_name: "AMEBA0",
          },
        ],
      },
    });
    const { container } = renderWithProviders(<CheckoutSummary />);
    expect(
      container.querySelector(".checkout-summary__row--discount"),
    ).not.toBeInTheDocument();
  });
});

describe("CheckoutSummary - pickup note", () => {
  it("always renders the pickup section regardless of cart contents", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<CheckoutSummary />);
    expect(screen.getByText("Recollida")).toBeInTheDocument();
  });
});
