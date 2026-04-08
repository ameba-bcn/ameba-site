import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import CloseModal from "./CloseModal";
import renderWithProviders from "../test/helpers/renderWithProviders";

// Mock ModalDialog to just render children
vi.mock("../components/layout/ModalDialog", () => ({
  default: ({ children, open }) => (open ? <div data-testid="modal">{children}</div> : null),
}));

vi.mock("../components/button/Button", () => ({
  default: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("CloseModal", () => {
  const handleClose = vi.fn();
  const handleExitFullscreen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when open is false", () => {
    const { container } = renderWithProviders(
      <CloseModal open={false} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders modal with copyText when open is true", () => {
    renderWithProviders(
      <CloseModal open={true} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} copyText="Are you sure?" />,
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("renders Continue button", () => {
    renderWithProviders(
      <CloseModal open={true} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} />,
    );
    expect(screen.getByText("continua")).toBeInTheDocument();
  });

  it("renders Exit button", () => {
    renderWithProviders(
      <CloseModal open={true} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} />,
    );
    expect(screen.getByText("sortir")).toBeInTheDocument();
  });

  it("calls handleClose when Continue is clicked", () => {
    renderWithProviders(
      <CloseModal open={true} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} />,
    );
    fireEvent.click(screen.getByText("continua"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls handleExitFullscreen when Exit is clicked", () => {
    renderWithProviders(
      <CloseModal open={true} handleClose={handleClose} handleExitFullscreen={handleExitFullscreen} />,
    );
    fireEvent.click(screen.getByText("sortir"));
    expect(handleExitFullscreen).toHaveBeenCalled();
  });
});
