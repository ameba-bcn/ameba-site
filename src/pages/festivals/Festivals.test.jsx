import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useDataStore from "../../stores/useDataStore";
import Festivals from "./Festivals";

// MemoryRouter doesn't touch the real window.location — read the current
// URL through a location-consuming sibling instead.
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

const festival = (overrides) => ({
  id: overrides.id,
  name: overrides.name,
  type: overrides.type ?? "festival",
  datetime: overrides.datetime,
  price: overrides.price ?? 0,
  images: ["/img/f.jpg"],
  address: "Nou Barris",
  cancelled: overrides.cancelled ?? false,
});

const AGENDA = [
  festival({ id: 1, name: "Parkfest 2024", type: "parkfest", datetime: "2024-06-01T20:00:00Z" }),
  festival({ id: 5, name: "Festa Major 2025", type: "festa major", datetime: "2025-05-01T20:00:00Z" }),
  festival({ id: 2, name: "Parkfest 2025", type: "parkfest", datetime: "2025-06-01T20:00:00Z" }),
  // Latest past event — becomes the featured one, excluded from the grid below.
  festival({ id: 3, name: "Altre Fest 2025", datetime: "2025-07-01T20:00:00Z", price: 15 }),
  { id: 4, name: "Taller", type: "taller", datetime: "2025-01-01T20:00:00Z" },
];

beforeEach(() => {
  useDataStore.setState({ agenda: AGENDA, isEventsLoading: false });
});

describe("Festivals", () => {
  it("lists parkfest/festival/festa major events in the historic grid, excluding Lab activities", () => {
    renderWithProviders(<Festivals />, { route: "/festivals" });

    expect(screen.getByText("Parkfest 2024")).toBeInTheDocument();
    expect(screen.getByText("Altre Fest 2025")).toBeInTheDocument();
    expect(screen.getByText("Festa Major 2025")).toBeInTheDocument();
    expect(screen.queryByText("Taller")).not.toBeInTheDocument();
  });

  it("filters the grid by type and reflects it in the URL", () => {
    const { container } = renderWithProviders(
      <>
        <Festivals />
        <LocationProbe />
      </>,
      { route: "/festivals" },
    );

    fireEvent.click(screen.getByText("Festival"));
    fireEvent.click(screen.getByText("FESTA MAJOR"));

    const grid = within(container.querySelector(".festivals__card-grid"));
    expect(grid.getByText("Festa Major 2025")).toBeInTheDocument();
    expect(grid.queryByText("Parkfest 2024")).not.toBeInTheDocument();
    expect(grid.queryByText("Altre Fest 2025")).not.toBeInTheDocument();
    expect(screen.getByTestId("location-search").textContent).toContain(
      "tipus=festa+major",
    );
  });

  it("filters the grid by year and reflects it in the URL", () => {
    const { container } = renderWithProviders(
      <>
        <Festivals />
        <LocationProbe />
      </>,
      { route: "/festivals" },
    );

    fireEvent.click(screen.getByText("Any"));
    fireEvent.click(screen.getByText("2024"));

    const grid = within(container.querySelector(".festivals__card-grid"));
    expect(grid.getByText("Parkfest 2024")).toBeInTheDocument();
    expect(grid.queryByText("Parkfest 2025")).not.toBeInTheDocument();
    expect(grid.queryByText("Altre Fest 2025")).not.toBeInTheDocument();
    expect(screen.getByTestId("location-search").textContent).toContain("any=2024");
  });

  it("shows the empty state when a filter combination has no results", () => {
    useDataStore.setState({
      agenda: [festival({ id: 1, name: "Parkfest 2024", datetime: "2024-06-01T20:00:00Z" })],
    });
    renderWithProviders(<Festivals />, { route: "/festivals?any=1999" });

    expect(screen.getByText(/sense resultats/i)).toBeInTheDocument();
  });

  it("clearing filters resets the grid and the URL params", () => {
    renderWithProviders(
      <>
        <Festivals />
        <LocationProbe />
      </>,
      { route: "/festivals?any=2024" },
    );

    expect(screen.queryByText("Parkfest 2025")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /borrar filtres/i }));

    expect(screen.getByText("Parkfest 2025")).toBeInTheDocument();
    expect(screen.getByTestId("location-search").textContent).toBe("");
  });

  it("features the next upcoming festival when one exists", () => {
    const farFuture = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const nearFuture = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    useDataStore.setState({
      agenda: [
        festival({ id: 1, name: "Parkfest passat", datetime: "2020-06-01T20:00:00Z" }),
        festival({ id: 2, name: "Fest llunyà", datetime: farFuture }),
        festival({ id: 3, name: "Fest proper", datetime: nearFuture }),
      ],
    });
    const { container } = renderWithProviders(<Festivals />, { route: "/festivals" });

    expect(
      container.querySelector(".featured-festival__title").textContent,
    ).toBe("Fest proper");
  });

  it("falls back to the most recent past festival when none are upcoming, and excludes it from the grid", () => {
    useDataStore.setState({
      agenda: [
        festival({ id: 1, name: "Parkfest 2024", datetime: "2024-06-01T20:00:00Z" }),
        festival({ id: 2, name: "Altre Fest 2025", datetime: "2025-07-01T20:00:00Z" }),
      ],
    });
    const { container } = renderWithProviders(<Festivals />, { route: "/festivals" });

    expect(
      container.querySelector(".featured-festival__title").textContent,
    ).toBe("Altre Fest 2025");

    const grid = within(container.querySelector(".festivals__card-grid"));
    expect(grid.getByText("Parkfest 2024")).toBeInTheDocument();
    expect(grid.queryByText("Altre Fest 2025")).not.toBeInTheDocument();
  });
});
