import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../test/helpers/renderWithProviders";
import useDataStore from "../stores/useDataStore";
import Botiga from "./Botiga";

const ITEM = (id) => ({
  id,
  name: `Samarreta ${id}`,
  images: [`/img/${id}.jpg`],
  price_range: "20.00€",
});

beforeEach(() => {
  useDataStore.setState({
    botiga: [],
    membership: [],
    isArtistsLoading: false,
    botigaError: false,
  });
});

describe("Botiga (Shop)", () => {
  it("renders cards for the fetched items", () => {
    useDataStore.setState({ botiga: [ITEM(1), ITEM(2)] });
    renderWithProviders(<Botiga />);

    expect(screen.getByText("Samarreta 1")).toBeInTheDocument();
    expect(screen.getByText("Samarreta 2")).toBeInTheDocument();
  });

  it("shows the empty state when there are no items and it isn't loading", () => {
    renderWithProviders(<Botiga />);

    expect(screen.getByText(/sense resultats/i)).toBeInTheDocument();
  });

  it("shows a retry button on error that calls fetchBotiga", () => {
    const fetchBotiga = vi.fn();
    useDataStore.setState({ botigaError: true, fetchBotiga });
    renderWithProviders(<Botiga />);

    fireEvent.click(screen.getByRole("button", { name: /torna-ho a provar/i }));

    expect(fetchBotiga).toHaveBeenCalled();
  });

  it("reveals more items with LoadMoreButton, 12 at a time", () => {
    const items = Array.from({ length: 15 }, (_, i) => ITEM(i + 1));
    useDataStore.setState({ botiga: items });
    renderWithProviders(<Botiga />);

    expect(screen.getByText("Samarreta 12")).toBeInTheDocument();
    expect(screen.queryByText("Samarreta 13")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /veure més/i }));

    expect(screen.getByText("Samarreta 13")).toBeInTheDocument();
    expect(screen.getByText("Samarreta 15")).toBeInTheDocument();
  });
});
