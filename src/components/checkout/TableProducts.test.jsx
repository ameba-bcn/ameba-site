import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import TableProducts from "./TableProducts";
import useCartStore from "../../stores/useCartStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartMultipleItems, mockCartDiscounted } from "../../test/mocks/data";

// Mock the Icon component
vi.mock("../ui/Icon", () => ({
  default: (props) => <span data-testid={`icon-${props.icon}`}>{props.icon}</span>,
}));

describe("TableProducts", () => {
  it("renders a row for each item_variant", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<TableProducts />);
    expect(screen.getByText(/Ameba T-shirt/)).toBeInTheDocument();
    expect(screen.getByText(/Ameba Vinyl/)).toBeInTheDocument();
  });

  it("displays item image", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<TableProducts />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
  });

  it("shows size when not unique", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<TableProducts />);
    expect(screen.getByText(/talla M/)).toBeInTheDocument();
  });

  it("does not show size when unique", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<TableProducts />);
    const vinylRow = screen.getByText(/Ameba Vinyl/).closest("tr");
    expect(vinylRow.textContent).not.toContain("talla unique");
  });

  it("calls substractToCart when delete icon is clicked", () => {
    const mockSubstract = vi.fn().mockResolvedValue();
    useCartStore.setState({
      cart_data: mockCartMultipleItems,
      substractToCart: mockSubstract,
    });
    renderWithProviders(<TableProducts />);
    const deleteButtons = screen.getAllByText("trash");
    fireEvent.click(deleteButtons[0].closest(".deleteItem"));
    expect(mockSubstract).toHaveBeenCalledWith(1);
  });

  it("renders discount price display when discount is present", () => {
    useCartStore.setState({ cart_data: mockCartDiscounted });
    renderWithProviders(<TableProducts />);
    // Discount item should show strikethrough price
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
    expect(screen.getByText(/AMEBA20/)).toBeInTheDocument();
  });

  it("renders regular price when no discount", () => {
    useCartStore.setState({ cart_data: mockCartMultipleItems });
    renderWithProviders(<TableProducts />);
    expect(screen.getByText("25.00 €")).toBeInTheDocument();
  });
});
