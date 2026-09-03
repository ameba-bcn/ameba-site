import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "./helpers/renderWithProviders";
import Home from "../pages/home/Home";
import Lab from "../pages/lab/Lab";
import Navbar from "../components/navbar/Navbar";
import PromoBar from "../components/ui/PromoBar";
import Footer from "../components/footer/Footer";
import LogSession from "../pages/LogSession";

describe("revamp smoke", () => {
  it("renders the login card at /inicia-sessio with tabs and the membership CTA", () => {
    renderWithProviders(<LogSession />, { route: "/inicia-sessio" });
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("EMAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("PASSWORD")).toBeInTheDocument();
    expect(document.querySelector('a[href="/associacio/nou-soci"]')).toBeTruthy();
    expect(document.querySelector('a[href="/registre"]')).toBeTruthy();
  });

  it("renders the signup form at /registre", () => {
    renderWithProviders(<LogSession />, { route: "/registre" });
    expect(screen.getByPlaceholderText("EMAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("PASSWORD")).toBeInTheDocument();
    expect(document.querySelector('input[name="username"]')).toBeTruthy();
    expect(document.querySelector('a[href="/inicia-sessio"]')).toBeTruthy();
  });

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

  it("renders the closable PromoBar (shared with Home) with an accessible close button", () => {
    renderWithProviders(<PromoBar closable />);
    expect(screen.getByText(/soci\/sòcia d'Ameba/i)).toBeInTheDocument();
    expect(screen.getByText(/Descobreix més/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tanca/i })).toBeInTheDocument();
  });

  it("renders footer link columns and dynamic year", () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText(`AMEBA ${new Date().getFullYear()} © · Tots els drets reservats`),
    ).toBeInTheDocument();
    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("Soci@s")).toBeInTheDocument();
  });
});
