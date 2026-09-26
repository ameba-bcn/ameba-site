import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Review from "./Review";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartRegular } from "../../test/mocks/data";

// Mock child components to isolate Review
vi.mock("./TableProducts", () => ({
  default: () => <div data-testid="table-products">TableProducts</div>,
}));
vi.mock("../forms/DiscountForm/DiscountCode", () => ({
  default: () => <div data-testid="discount-code">DiscountCode</div>,
}));
vi.mock("../forms/DeliveryForm/DeliveryMethod", () => ({
  default: () => <div data-testid="delivery-method">DeliveryMethod</div>,
}));

describe("Review", () => {
  it("renders TableProducts component", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByTestId("table-products")).toBeInTheDocument();
  });

  it("renders DeliveryMethod component", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByTestId("delivery-method")).toBeInTheDocument();
  });

  it("renders DiscountCode component", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByTestId("discount-code")).toBeInTheDocument();
  });
});
