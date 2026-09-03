import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useAuthStore from "../../stores/useAuthStore";
import SocisDirectory from "./SocisDirectory";

describe("SocisDirectory", () => {
  beforeEach(() => {
    useAuthStore.setState({
      isLoggedIn: false,
      user_member_data: {},
    });
  });

  it("hides the CTA for a guest", () => {
    renderWithProviders(<SocisDirectory />, { route: "/associacio/socis" });
    expect(document.querySelector(".socis-directory__cta")).not.toBeInTheDocument();
  });

  it("hides the CTA for a logged-in account with no memberships", () => {
    useAuthStore.setState({
      isLoggedIn: true,
      user_member_data: { type: "Socio", memberships: [] },
    });
    renderWithProviders(<SocisDirectory />, { route: "/associacio/socis" });
    expect(document.querySelector(".socis-directory__cta")).not.toBeInTheDocument();
  });

  it("shows the CTA for a logged-in account with an active membership", () => {
    useAuthStore.setState({
      isLoggedIn: true,
      user_member_data: { type: "Socio", memberships: [{ id: 1, expires: "2027-01-01" }] },
    });
    renderWithProviders(<SocisDirectory />, { route: "/associacio/socis" });
    expect(document.querySelector(".socis-directory__cta")).toBeInTheDocument();
  });
});
