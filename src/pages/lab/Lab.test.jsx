import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useDataStore from "../../stores/useDataStore";
import Lab from "./Lab";

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

const activity = (overrides) => ({
  id: overrides.id,
  name: overrides.name,
  type: overrides.type,
  datetime: overrides.datetime,
  price: overrides.price ?? 0,
  images: ["/img/a.jpg"],
  address: "Centre Cultural Albareda",
});

const AGENDA = [
  activity({ id: 1, name: "Taller de synth", type: "taller", datetime: "2025-01-10T19:00:00Z" }),
  activity({ id: 2, name: "Xerrada DJ", type: "xerrada", datetime: "2025-02-10T19:00:00Z" }),
  { id: 3, name: "Ameba Parkfest", type: "festival", datetime: "2025-03-10T19:00:00Z" },
];

beforeEach(() => {
  useDataStore.setState({ agenda: AGENDA, isEventsLoading: false });
});

describe("Lab", () => {
  it("excludes festival-type events from the activities grid", () => {
    renderWithProviders(<Lab />, { route: "/lab" });

    expect(screen.getByText("Taller de synth")).toBeInTheDocument();
    expect(screen.getByText("Xerrada DJ")).toBeInTheDocument();
    expect(screen.queryByText("Ameba Parkfest")).not.toBeInTheDocument();
  });

  it("filters the grid by type via FilterBar, reflected in the URL", () => {
    renderWithProviders(
      <>
        <Lab />
        <LocationProbe />
      </>,
      { route: "/lab" },
    );

    fireEvent.click(screen.getByRole("button", { name: "taller" }));

    expect(screen.getByText("Taller de synth")).toBeInTheDocument();
    expect(screen.queryByText("Xerrada DJ")).not.toBeInTheDocument();
    expect(screen.getByTestId("location-search").textContent).toContain("tipus=taller");
  });

  it("resets type and calendar-day filters with Borrar filtres", () => {
    renderWithProviders(<Lab />, { route: "/lab" });

    fireEvent.click(screen.getByRole("button", { name: "taller" }));
    expect(screen.queryByText("Xerrada DJ")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /borrar filtres/i }));
    expect(screen.getByText("Xerrada DJ")).toBeInTheDocument();
  });
});
