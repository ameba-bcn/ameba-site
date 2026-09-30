import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  it("applies the solid-variant class to the container", () => {
    renderWithProviders(
      <FilterBar
        items={["Tallers", "Xerrades"]}
        activeItem={null}
        onSelect={() => {}}
        variant="solid"
        allLabel={null}
      />,
    );

    expect(document.querySelector(".filter-bar--solid")).toBeTruthy();
  });

  it("does not apply the solid-variant class by default", () => {
    renderWithProviders(
      <FilterBar items={["Tallers"]} activeItem={null} onSelect={() => {}} />,
    );

    expect(document.querySelector(".filter-bar--solid")).toBeFalsy();
  });

  it("calls onSelect(null) when the reset button is pressed", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <FilterBar
        items={["Tallers", "Xerrades"]}
        activeItem="Tallers"
        onSelect={onSelect}
        allLabel={null}
        resetLabel="Borrar filtres"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /borrar filtres/i }));

    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it("omits the 'all' button when allLabel is falsy", () => {
    renderWithProviders(
      <FilterBar items={["Tallers"]} activeItem={null} onSelect={() => {}} allLabel={null} />,
    );

    expect(screen.queryByText("Tot")).not.toBeInTheDocument();
  });
});
