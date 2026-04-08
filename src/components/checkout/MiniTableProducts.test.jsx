import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import MiniTableProducts from "./MiniTableProducts";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartMultipleItems } from "../../test/mocks/data";

describe("MiniTableProducts", () => {
  it("renders a row for each item_variant", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<MiniTableProducts />);
    // Item name and size appear in the same td, so use regex
    expect(screen.getByText(/Ameba T-shirt/)).toBeInTheDocument();
    expect(screen.getByText(/Ameba Vinyl/)).toBeInTheDocument();
  });

  it("displays item price", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<MiniTableProducts />);
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
    expect(screen.getByText("30.00 €")).toBeInTheDocument();
  });

  it("shows size when not unique", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<MiniTableProducts />);
    // Item with size "M" should show "talla M"
    expect(screen.getByText(/talla M/)).toBeInTheDocument();
  });

  it("does not show size when size is unique", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<MiniTableProducts />);
    // Vinyl has size "unique" — should not show "talla unique"
    const vinylRow = screen.getByText(/Ameba Vinyl/).closest("tr");
    expect(vinylRow.textContent).not.toContain("talla unique");
  });

  it("renders empty table when no items", () => {
    useCartStore.setState({ cart_data: { item_variants: [] } });
    const { container } = renderWithProviders(<MiniTableProducts />);
    expect(container.querySelector("tbody").children.length).toBe(0);
  });
});
