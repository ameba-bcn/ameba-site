import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Review from "./Review";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartRegular, mockCartMember } from "../../test/mocks/data";

// Mock child components to isolate Review
vi.mock("./TableProducts", () => ({
  default: () => <div data-testid="table-products">TableProducts</div>,
}));
vi.mock("../forms/DiscountForm/DiscountCode", () => ({
  default: () => <div data-testid="discount-code">DiscountCode</div>,
}));

describe("Review", () => {
  it("renders total price", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
  });

  it("renders TableProducts component", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByTestId("table-products")).toBeInTheDocument();
  });

  it("renders DiscountCode component", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByTestId("discount-code")).toBeInTheDocument();
  });

  it("shows non-subscription footer for regular items", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    // Regular items have is_subscription: false, so hasNoSubscription = true
    // Should show review-footer-3 (contacta info@ameba.cat)
    expect(screen.getByText(/info@ameba.cat/)).toBeInTheDocument();
  });

  it("shows subscription footer for subscription-only cart", () => {
    useCartStore.setState({ cart_data: mockCartMember });
    renderWithProviders(<Review />);
    // All items are subscription, hasNoSubscription = false
    // Should show review-footer-4 (T'enviarem un email)
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });

  it("renders Total label", () => {
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Review />);
    expect(screen.getByText("Total")).toBeInTheDocument();
  });
});
