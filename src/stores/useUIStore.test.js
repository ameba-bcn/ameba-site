import { describe, it, expect } from "vitest";
import useUIStore from "./useUIStore";

describe("useUIStore", () => {
  it("has isFullscreenOpen as false by default", () => {
    expect(useUIStore.getState().isFullscreenOpen).toBe(false);
  });

  it("openFullscreen sets isFullscreenOpen to true", () => {
    useUIStore.getState().openFullscreen();
    expect(useUIStore.getState().isFullscreenOpen).toBe(true);
  });

  it("closeFullscreen sets isFullscreenOpen to false", () => {
    useUIStore.setState({ isFullscreenOpen: true });
    useUIStore.getState().closeFullscreen();
    expect(useUIStore.getState().isFullscreenOpen).toBe(false);
  });

  it("openMenu sets isMenuOpen to true", () => {
    useUIStore.getState().openMenu();
    expect(useUIStore.getState().isMenuOpen).toBe(true);
  });

  it("closeMenu sets isMenuOpen to false", () => {
    useUIStore.setState({ isMenuOpen: true });
    useUIStore.getState().closeMenu();
    expect(useUIStore.getState().isMenuOpen).toBe(false);
  });

  it("setNavigating updates isNavigating", () => {
    useUIStore.getState().setNavigating(true);
    expect(useUIStore.getState().isNavigating).toBe(true);
    useUIStore.getState().setNavigating(false);
    expect(useUIStore.getState().isNavigating).toBe(false);
  });
});
