import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import Associacio from "./Associacio";

describe("Associacio", () => {
  it("renders a single h1 (the hero title)", () => {
    renderWithProviders(<Associacio />, { route: "/associacio" });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the three blob headings", () => {
    renderWithProviders(<Associacio />, { route: "/associacio" });
    expect(screen.getByText("QUI SOM?")).toBeInTheDocument();
    expect(screen.getByText("QUÈ FEM?")).toBeInTheDocument();
    expect(screen.getByText("PER QUÈ?")).toBeInTheDocument();
  });

  it("renders all 8 stat values and the 8 work groups", () => {
    renderWithProviders(<Associacio />, { route: "/associacio" });
    expect(screen.getByText("16K")).toBeInTheDocument();
    expect(screen.getByText("GESTIÓ")).toBeInTheDocument();
    expect(screen.getByText("RADIO")).toBeInTheDocument();
  });

  it("links the CTA button to /associacio/nou-soci and the directory button to /associacio/socis", () => {
    renderWithProviders(<Associacio />, { route: "/associacio" });
    expect(screen.getByText("INSCRIU-TE!").closest("a")).toHaveAttribute(
      "href",
      "/associacio/nou-soci",
    );
    expect(
      screen.getByText("PROJECTES SOCIS/SÒCIES").closest("a"),
    ).toHaveAttribute("href", "/associacio/socis");
  });

  it("links CONTACTA to a mailto address", () => {
    renderWithProviders(<Associacio />, { route: "/associacio" });
    const contactLink = screen.getByText("CONTACTA").closest("a");
    expect(contactLink.getAttribute("href")).toMatch(/^mailto:/);
  });
});
