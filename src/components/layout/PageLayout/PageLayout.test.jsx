import React from "react";
import { describe, it, expect } from "vitest";
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
});
