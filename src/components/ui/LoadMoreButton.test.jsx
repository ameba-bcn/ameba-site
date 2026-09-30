import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import LoadMoreButton from "./LoadMoreButton";

describe("LoadMoreButton", () => {
  it("renders the default 'veure més' label and calls onClick when pressed", () => {
    const onClick = vi.fn();
    renderWithProviders(<LoadMoreButton onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: /veure més/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports a load-more pattern that increments visibleCount by 12 per click", () => {
    let visibleCount = 12;
    const increment = () => {
      visibleCount += 12;
    };
    renderWithProviders(<LoadMoreButton onClick={increment} />);

    const button = screen.getByRole("button", { name: /veure més/i });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(visibleCount).toBe(36);
  });
});
