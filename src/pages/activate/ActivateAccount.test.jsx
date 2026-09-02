import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import ActivateAccount from "./ActivateAccount";

describe("ActivateAccount", () => {
  beforeEach(() => {
    useAuthStore.setState({
      validateEmail: vi.fn().mockResolvedValue(),
      getUserData: vi.fn().mockResolvedValue({}),
      getMemberProfile: vi.fn().mockResolvedValue(),
    });
    useCartStore.setState({
      getCart: vi.fn().mockResolvedValue(),
      cart_data: {},
    });
  });

  it("shows the pending state with a generic message when there is no token or known email", () => {
    renderWithProviders(<ActivateAccount />, { route: "/activate" });
    expect(screen.getByRole("heading", { level: 1, name: /verifica el correu/i })).toBeInTheDocument();
    expect(screen.getByText(/correu amb què et vas registrar/i)).toBeInTheDocument();
  });

  it("shows the registered email in the pending state when threaded via router state", () => {
    renderWithProviders(<ActivateAccount />, {
      route: { pathname: "/activate", state: { email: "hector@ameba.cat" } },
    });
    expect(screen.getByText("hector@ameba.cat")).toBeInTheDocument();
  });

  it("checks the token, then shows the done state and refreshes user/cart data", async () => {
    renderWithProviders(<ActivateAccount />, {
      route: "/activate?token=abc123",
    });

    expect(screen.getByText(/un moment/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/compte activat/i)).toBeInTheDocument();
    });
    expect(useAuthStore.getState().validateEmail).toHaveBeenCalledWith("abc123");
    expect(useAuthStore.getState().getUserData).toHaveBeenCalled();
    expect(useCartStore.getState().getCart).toHaveBeenCalled();
  });

  it("shows the error state when the token is rejected", async () => {
    useAuthStore.setState({ validateEmail: vi.fn().mockRejectedValue() });
    renderWithProviders(<ActivateAccount />, {
      route: "/activate?token=expired",
    });

    await waitFor(() => {
      expect(screen.getByText(/enllaç caducat/i)).toBeInTheDocument();
    });
  });
});
