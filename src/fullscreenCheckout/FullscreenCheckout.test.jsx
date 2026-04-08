import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import FullscreenCheckout from "./FullscreenCheckout";
import useUIStore from "../stores/useUIStore";
import useCartStore from "../stores/useCartStore";
import renderWithProviders from "../test/helpers/renderWithProviders";

vi.mock("./CloseModal", () => ({
  default: ({ open, handleClose, handleExitFullscreen, copyText }) =>
    open ? (
      <div data-testid="close-modal">
        <span>{copyText}</span>
        <button data-testid="continue-btn" onClick={handleClose}>
          continua
        </button>
        <button data-testid="exit-btn" onClick={handleExitFullscreen}>
          sortir
        </button>
      </div>
    ) : null,
}));

describe("FullscreenCheckout", () => {
  const setupMocks = () => {
    const mockCloseFullscreen = vi.fn();
    const mockGetCart = vi.fn().mockResolvedValue();
    useUIStore.setState({ closeFullscreen: mockCloseFullscreen });
    useCartStore.setState({ getCart: mockGetCart });
    return { mockCloseFullscreen, mockGetCart };
  };

  it("renders exit text", () => {
    setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    expect(screen.getByText("sortir")).toBeInTheDocument();
  });

  it("does not show CloseModal by default", () => {
    setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    expect(screen.queryByTestId("close-modal")).not.toBeInTheDocument();
  });

  it("shows CloseModal when exit text is clicked", () => {
    setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    fireEvent.click(screen.getByText("sortir"));
    expect(screen.getByTestId("close-modal")).toBeInTheDocument();
  });

  it("hides CloseModal when Continue is clicked", () => {
    setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    fireEvent.click(screen.getByText("sortir"));
    expect(screen.getByTestId("close-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("continue-btn"));
    expect(screen.queryByTestId("close-modal")).not.toBeInTheDocument();
  });

  it("calls closeFullscreen when Exit is clicked", () => {
    const { mockCloseFullscreen } = setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    fireEvent.click(screen.getByText("sortir"));
    fireEvent.click(screen.getByTestId("exit-btn"));
    expect(mockCloseFullscreen).toHaveBeenCalled();
  });

  it("calls getCart when exiting fullscreen", () => {
    const { mockGetCart } = setupMocks();
    renderWithProviders(<FullscreenCheckout />);
    fireEvent.click(screen.getByText("sortir"));
    fireEvent.click(screen.getByTestId("exit-btn"));
    expect(mockGetCart).toHaveBeenCalled();
  });
});
