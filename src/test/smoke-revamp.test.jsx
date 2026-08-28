import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "./helpers/renderWithProviders";
import Home from "../pages/home/Home";
import Lab from "../pages/lab/Lab";
import Navbar from "../components/navbar/Navbar";
import PromoBanner from "../components/banner/PromoBanner";
import Contacte from "../contacte/Contacte";

describe("revamp smoke", () => {
  it("renders Home with hero and 4 section bands", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/DES DE 2014/i)).toBeInTheDocument();
    expect(document.getElementById("associacio")).toBeTruthy();
    expect(document.getElementById("festivals")).toBeTruthy();
    expect(document.getElementById("lab")).toBeTruthy();
    expect(document.getElementById("shop")).toBeTruthy();
  });

  it("renders the real Lab view with its calendar and activity grid", () => {
    renderWithProviders(<Lab />, { route: "/lab" });
    expect(screen.getByText("Calendari")).toBeInTheDocument();
    expect(screen.getByText("Activitats en curs")).toBeInTheDocument();
  });

  it("renders Navbar with the 4 section items", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Associació")).toBeInTheDocument();
    expect(screen.getByText("Festivals")).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
  });

  it("renders PromoBanner on home with an accessible close button", () => {
    renderWithProviders(<PromoBanner />);
    expect(screen.getByText(/soci\/sòcia d'Ameba/i)).toBeInTheDocument();
    expect(screen.getByText(/Descobreix més/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tanca/i })).toBeInTheDocument();
  });

  it("renders footer link columns and dynamic year", () => {
    renderWithProviders(<Contacte />);
    expect(
      screen.getByText(`AMEBA ${new Date().getFullYear()}©`),
    ).toBeInTheDocument();
    expect(screen.getByText("AGENDA")).toBeInTheDocument();
    expect(screen.getByText("SOCI@S")).toBeInTheDocument();
  });
});
