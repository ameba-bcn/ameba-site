import { create } from "zustand";

const useUIStore = create((set) => ({
  // Menu state
  isMenuOpen: false,
  isCartMenuOpen: false,
  isProfileMenuOpen: false,

  // Fullscreen state
  isFullscreenOpen: false,
  isSiteUnavailableOpen: true,

  // Menu actions
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  openCartMenu: () => set({ isCartMenuOpen: true }),
  closeCartMenu: () => set({ isCartMenuOpen: false }),
  openProfileMenu: () => set({ isProfileMenuOpen: true }),
  closeProfileMenu: () => set({ isProfileMenuOpen: false }),

  // Fullscreen actions
  openFullscreen: () => set({ isFullscreenOpen: true }),
  closeFullscreen: () => set({ isFullscreenOpen: false }),
  openSiteUnavailable: () => set({ isSiteUnavailableOpen: true }),
  closeSiteUnavailable: () => set({ isSiteUnavailableOpen: false }),
}));

export default useUIStore;
