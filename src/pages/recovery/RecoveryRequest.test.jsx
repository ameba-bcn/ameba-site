import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useAuthStore from "../../stores/useAuthStore";
import RecoveryRequest from "./RecoveryRequest";

describe("RecoveryRequest", () => {
  beforeEach(() => {
    useAuthStore.setState({
      sendEmailPasswordRecovery: vi.fn().mockResolvedValue(),
    });
  });

  it("shows an inline error and never calls the store for an invalid email", async () => {
    const sendEmailPasswordRecovery = vi.fn();
    useAuthStore.setState({ sendEmailPasswordRecovery });
    renderWithProviders(<RecoveryRequest />, { route: "/send-recovery" });

    // "a@b" passes the <input type="email"> native constraint (so the
    // submit event actually fires in jsdom, same as a real browser) but
    // still fails the app's own stricter regex — exercising our inline
    // error instead of the browser's own validation UI.
    fireEvent.change(screen.getByPlaceholderText("EMAIL"), {
      target: { value: "a@b" },
    });
    fireEvent.click(screen.getByRole("button", { name: /envia'm l'enllaç/i }));

    // Formik always resolves validation through a promise internally, even
    // for a synchronous validate function — the error only lands after a tick.
    await waitFor(() => {
      expect(screen.getByText(/format erroni/i)).toBeInTheDocument();
    });
    expect(sendEmailPasswordRecovery).not.toHaveBeenCalled();
  });

  it("requests the link and moves to the confirmation step with the email shown", async () => {
    renderWithProviders(<RecoveryRequest />, { route: "/send-recovery" });

    fireEvent.change(screen.getByPlaceholderText("EMAIL"), {
      target: { value: "hector@ameba.cat" },
    });
    fireEvent.click(screen.getByRole("button", { name: /envia'm l'enllaç/i }));

    await waitFor(() => {
      expect(screen.getByText("hector@ameba.cat")).toBeInTheDocument();
    });
    expect(useAuthStore.getState().sendEmailPasswordRecovery).toHaveBeenCalledWith(
      "hector@ameba.cat",
    );
  });

  it("can resend the link and go back to using another email", async () => {
    renderWithProviders(<RecoveryRequest />, { route: "/send-recovery" });
    fireEvent.change(screen.getByPlaceholderText("EMAIL"), {
      target: { value: "hector@ameba.cat" },
    });
    fireEvent.click(screen.getByRole("button", { name: /envia'm l'enllaç/i }));
    await waitFor(() => screen.getByText("hector@ameba.cat"));

    fireEvent.click(screen.getByRole("button", { name: /reenvia l'enllaç/i }));
    await waitFor(() => {
      expect(useAuthStore.getState().sendEmailPasswordRecovery).toHaveBeenCalledTimes(2);
    });
    expect(screen.getByText(/enllaç reenviat \(1\)/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /fes servir un altre email/i }));
    expect(screen.getByPlaceholderText("EMAIL")).toHaveValue("");
  });
});
