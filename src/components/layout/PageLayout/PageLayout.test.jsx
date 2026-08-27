import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "../../../test/helpers/renderWithProviders";
import PageLayout from "./PageLayout";

describe("PageLayout", () => {
  it("applies a page-layout--<section> class when section is set", () => {
    renderWithProviders(
      <PageLayout section="lab">
        <p>content</p>
      </PageLayout>,
    );

    expect(document.querySelector(".page-layout--lab")).toBeTruthy();
  });

  it("does not add a section class when section is not set", () => {
    renderWithProviders(
      <PageLayout>
        <p>content</p>
      </PageLayout>,
    );

    expect(document.querySelector('[class*="page-layout--"]')).toBeFalsy();
  });

  it("renders PromoBar when promo is true", () => {
    renderWithProviders(
      <PageLayout promo>
        <p>content</p>
      </PageLayout>,
    );

    expect(screen.getByText(/Descobreix més/i)).toBeInTheDocument();
  });

  it("does not render PromoBar by default", () => {
    renderWithProviders(
      <PageLayout>
        <p>content</p>
      </PageLayout>,
    );

    expect(screen.queryByText(/Descobreix més/i)).not.toBeInTheDocument();
  });
});
