import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// Suppress unhandled rejections from leaked axios/network calls in tests
process.on("unhandledRejection", () => {});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock window.matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Reset localStorage between tests
beforeEach(() => {
  localStorage.clear();
});

// Reset all Zustand stores between tests
beforeEach(async () => {
  const { default: useCartStore } = await import("../stores/useCartStore");
  const { default: useAuthStore } = await import("../stores/useAuthStore");
  const { default: useUIStore } = await import("../stores/useUIStore");
  const { default: useProfileStore } = await import("../stores/useProfileStore");

  useCartStore.setState({
    cart_data: {},
    checkout: {},
    stripe: false,
    cartBusy: false,
  });

  useAuthStore.setState({
    isLoggedIn: false,
    user: null,
    user_data: {
      username: "",
      password: "",
      email: "",
      member: "",
      date_joined: "",
    },
    user_member_data: {
      address: "",
      first_name: "",
      last_name: "",
      number: 0,
      phone_number: "",
      user: 0,
    },
  });

  useUIStore.setState({
    isMenuOpen: false,
    isCartMenuOpen: false,
    isProfileMenuOpen: false,
    isFullscreenOpen: false,
    isSiteUnavailableOpen: true,
    isNavigating: false,
  });

  useProfileStore.setState({
    user_profile: "",
    images: [],
  });
});
