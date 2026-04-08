import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import MembershipForm from "./MembershipForm";
import useAuthStore from "../../../stores/useAuthStore";
import renderWithProviders from "../../../test/helpers/renderWithProviders";
import { mockMemberProfile } from "../../../test/mocks/data";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

describe("MembershipForm", () => {
  const setupExistingMember = () => {
    const mockUpdate = vi.fn().mockResolvedValue(mockMemberProfile);
    const mockCreate = vi.fn().mockResolvedValue(mockMemberProfile);
    useAuthStore.setState({
      user_member_data: mockMemberProfile,
      updateMemberProfile: mockUpdate,
      createMemberProfile: mockCreate,
    });
    return { mockUpdate, mockCreate };
  };

  const setupNewMember = () => {
    const mockUpdate = vi.fn().mockResolvedValue({});
    const mockCreate = vi.fn().mockResolvedValue(mockMemberProfile);
    useAuthStore.setState({
      user_member_data: {},
      updateMemberProfile: mockUpdate,
      createMemberProfile: mockCreate,
    });
    return { mockUpdate, mockCreate };
  };

  it("renders all form fields", () => {
    setupExistingMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Joan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Garcia")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345678A")).toBeInTheDocument();
    expect(screen.getByDisplayValue("612345678")).toBeInTheDocument();
  });

  it("populates fields with existing member data", () => {
    setupExistingMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    expect(screen.getByDisplayValue("Joan")).toBeInTheDocument();
  });

  it("shows member number for existing member", () => {
    setupExistingMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    expect(screen.getByDisplayValue("42")).toBeInTheDocument();
  });

  it("does not show member number for new member", () => {
    setupNewMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    expect(screen.queryByDisplayValue("42")).not.toBeInTheDocument();
  });

  it("shows required errors when submitting empty form", async () => {
    setupNewMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    const form = screen.getByText("guarda").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getAllByText(/obligatori/i).length).toBeGreaterThan(0);
    });
  });

  it("calls updateMemberProfile for existing member on submit", async () => {
    const { mockUpdate } = setupExistingMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);

    // Change a field to enable the save button
    const firstNameInput = screen.getByDisplayValue("Joan");
    fireEvent.change(firstNameInput, { target: { value: "Maria" } });
    fireEvent.blur(firstNameInput);

    const form = screen.getByText("guarda").closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  it("calls createMemberProfile for new member on submit", async () => {
    const { mockCreate } = setupNewMember();
    const mockHandleNext = vi.fn();
    renderWithProviders(
      <MembershipForm setButtonDisabled={vi.fn()} handleNext={mockHandleNext} />,
    );

    // Fill all required fields using input IDs
    fireEvent.change(document.getElementById("username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(document.getElementById("first_name"), {
      target: { value: "Joan" },
    });
    fireEvent.change(document.getElementById("last_name"), {
      target: { value: "Garcia" },
    });
    fireEvent.change(document.getElementById("identity_card"), {
      target: { value: "12345678A" },
    });
    fireEvent.change(document.getElementById("phone_number"), {
      target: { value: "612345678" },
    });

    const form = screen.getByText("guarda").closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });

  it("disables cancel button when no data has changed", () => {
    setupExistingMember();
    renderWithProviders(<MembershipForm setButtonDisabled={vi.fn()} />);
    const cancelButton = screen.getByText("cancel·la");
    expect(cancelButton).toBeDisabled();
  });
});
