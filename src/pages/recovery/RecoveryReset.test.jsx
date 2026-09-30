import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useAuthStore from "../../stores/useAuthStore";
import RecoveryReset from "./RecoveryReset";

describe("RecoveryReset", () => {
  beforeEach(() => {
    useAuthStore.setState({ passwordRecovery: vi.fn().mockResolvedValue() });
  });

  it("shows an invalid-link state when there is no token in the URL", () => {
    renderWithProviders(<RecoveryReset />, { route: "/recovery" });
    expect(screen.getByText(/enllaç no vàlid/i)).toBeInTheDocument();
  });

  it("blocks submit and never calls the store when the passwords don't match", async () => {
    const passwordRecovery = vi.fn();
    useAuthStore.setState({ passwordRecovery });
    renderWithProviders(<RecoveryReset />, { route: "/recovery?token=abc123" });

    fireEvent.change(screen.getByPlaceholderText("PASSWORD"), {
      target: { value: "unaContrasenya1" },
    });
    fireEvent.change(screen.getByLabelText(/repeteix la contrasenya/i), {
      target: { value: "altraContrasenya2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /guarda i entra/i }));

    // Formik always resolves validation through a promise internally, even
    // for a synchronous validate function — the error only lands after a tick.
    await waitFor(() => {
      expect(screen.getByText(/no coincideixen/i)).toBeInTheDocument();
    });
    expect(passwordRecovery).not.toHaveBeenCalled();
  });

  it("submits the new password with the token and shows the done state", async () => {
    renderWithProviders(<RecoveryReset />, { route: "/recovery?token=abc123" });

    fireEvent.change(screen.getByPlaceholderText("PASSWORD"), {
      target: { value: "unaContrasenya1" },
    });
    fireEvent.change(screen.getByLabelText(/repeteix la contrasenya/i), {
      target: { value: "unaContrasenya1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /guarda i entra/i }));

    await waitFor(() => {
      expect(screen.getByText(/tot llest/i)).toBeInTheDocument();
    });
    expect(useAuthStore.getState().passwordRecovery).toHaveBeenCalledWith(
      "abc123",
      "unaContrasenya1",
    );
  });
});
