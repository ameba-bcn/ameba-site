import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import dataService from "../../store/services/data.service";
import Legal from "./Legal";

vi.mock("../../store/services/data.service", () => ({
  default: { getLegal: vi.fn() },
}));

describe("Legal", () => {
  beforeEach(() => {
    dataService.getLegal.mockResolvedValue({ data: [] });
  });

  it("shows an empty state while there are no documents", async () => {
    renderWithProviders(<Legal />, { route: "/legal" });
    await waitFor(() => {
      expect(dataService.getLegal).toHaveBeenCalled();
    });
    expect(screen.getByText(/encara no hem penjat cap document/i)).toBeInTheDocument();
  });

  it("renders fetched documents with a download link and the most recent update", async () => {
    dataService.getLegal.mockResolvedValue({
      data: [
        {
          title: "Estatuts",
          description: "Objecte i òrgans de govern.",
          updated: "2024-05-08T14:26:02.956518+02:00",
          size: "480 KB",
          file: "https://example.com/estatuts.pdf",
        },
        {
          title: "Memòria 2025",
          description: "Comptes de l'any.",
          updated: "2026-03-10T10:00:00.000000+02:00",
          size: "2.4 MB",
          file: "https://example.com/memoria.pdf",
        },
      ],
    });
    renderWithProviders(<Legal />, { route: "/legal" });

    expect(await screen.findByText("Estatuts")).toBeInTheDocument();
    expect(screen.getByText("Memòria 2025")).toBeInTheDocument();
    expect(
      screen.getByText("Estatuts").closest("a"),
    ).toHaveAttribute("href", "https://example.com/estatuts.pdf");
    // "última actualització" reflects the most recently updated document, not just the first one.
    expect(screen.getByText("MARÇ 2026")).toBeInTheDocument();
  });

  it("opens and closes a policy on click", async () => {
    renderWithProviders(<Legal />, { route: "/legal" });
    await waitFor(() => expect(dataService.getLegal).toHaveBeenCalled());

    const trigger = screen.getByRole("button", { name: /condicions de compra/i });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
