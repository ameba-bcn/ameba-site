import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "./Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import renderWithProviders from "../../test/helpers/renderWithProviders";
import { mockCartRegular, mockCartMember, mockCartFree } from "../../test/mocks/data";

// Mock child components to isolate Checkout logic
vi.mock("./Review", () => ({
  default: () => <div data-testid="review">Review</div>,
}));
vi.mock("./Payment", () => ({
  default: () => <div data-testid="payment">Payment</div>,
}));
vi.mock("../forms/MembershipForm/MembershipFormLayout", () => ({
  default: () => (
    <div data-testid="membership-form-layout">MembershipFormLayout</div>
  ),
}));
vi.mock("../forms/MembershipForm/MembershipFormReadOnly", () => ({
  default: () => <div data-testid="membership-form-readonly">MembershipFormReadOnly</div>,
}));
vi.mock("../button/Button", () => ({
  default: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} data-testid={`btn-${typeof children === 'string' ? children : 'action'}`}>
      {children}
    </button>
  ),
}));

const setupLoggedIn = (cartData) => {
  const mockCheckoutCart = vi.fn().mockResolvedValue();
  const mockCheckoutPaymentCart = vi.fn().mockResolvedValue();
  const mockGetMemberProfile = vi.fn().mockResolvedValue();

  useAuthStore.setState({
    isLoggedIn: true,
    user_data: { member: true },
    getMemberProfile: mockGetMemberProfile,
  });
  useCartStore.setState({
    cart_data: cartData,
    checkoutCart: mockCheckoutCart,
    checkoutPaymentCart: mockCheckoutPaymentCart,
  });

  return { mockCheckoutCart, mockCheckoutPaymentCart, mockGetMemberProfile };
};

// Helpers to query accordion sections
const getSections = () => document.querySelectorAll(".checkout-section");

describe("Checkout - route guards", () => {
  it("redirects to / when user is not logged in", () => {
    useAuthStore.setState({ isLoggedIn: false });
    useCartStore.setState({ cart_data: mockCartRegular });
    renderWithProviders(<Checkout />, { route: "/checkout" });
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });

  it("redirects to / when cart has no items", () => {
    useAuthStore.setState({ isLoggedIn: true, getMemberProfile: vi.fn().mockResolvedValue() });
    useCartStore.setState({ cart_data: { item_variants: [] } });
    renderWithProviders(<Checkout />, { route: "/checkout" });
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });

  it("does not redirect when logged in with items", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />, { route: "/checkout" });
    expect(screen.getByText("pagament")).toBeInTheDocument();
  });
});

describe("Checkout - accordion sections", () => {
  it("renders all 3 sections", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(getSections().length).toBe(3);
  });

  it("renders section numbers 1, 2, 3", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    const numbers = document.querySelectorAll(".checkout-section__number");
    expect(numbers[0].textContent).toBe("1");
    expect(numbers[1].textContent).toBe("2");
    expect(numbers[2].textContent).toBe("3");
  });

  it("renders Catalan section titles by default", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("Dades personals")).toBeInTheDocument();
    expect(screen.getByText("Cistella")).toBeInTheDocument();
    expect(screen.getByText("Dades de pagament")).toBeInTheDocument();
  });

  it("marks step 1 as active for regular cart (no subscription)", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    const sections = getSections();
    // Step 0 is completed (0 < activeStep=1), step 1 active, step 2 disabled
    expect(sections[0].classList.contains("checkout-section--completed")).toBe(true);
    expect(sections[1].classList.contains("checkout-section--active")).toBe(true);
    expect(sections[2].classList.contains("checkout-section--disabled")).toBe(true);
  });

  it("marks step 0 as active for subscription cart", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    const sections = getSections();
    expect(sections[0].classList.contains("checkout-section--active")).toBe(true);
    expect(sections[1].classList.contains("checkout-section--disabled")).toBe(true);
    expect(sections[2].classList.contains("checkout-section--disabled")).toBe(true);
  });

  it("shows ▼ indicator on active section", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    const indicators = document.querySelectorAll(".checkout-section__indicator");
    expect(indicators[1].textContent).toBe("▼");
  });

  it("shows ✓ indicator on completed sections after advancing", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      const indicators = document.querySelectorAll(".checkout-section__indicator");
      expect(indicators[1].textContent).toBe("✓");
    });
  });
});

describe("Checkout - step 0 (Membership)", () => {
  it("renders MembershipFormLayout for subscription cart", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("membership-form-layout")).toBeInTheDocument();
  });

  it("renders MembershipFormReadOnly for regular cart", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("membership-form-readonly")).toBeInTheDocument();
  });

  it("shows Next button at step 0 for subscription cart", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("següent pas")).toBeInTheDocument();
  });
});

describe("Checkout - step 1 (Review)", () => {
  it("renders Review component", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("review")).toBeInTheDocument();
  });

  it("shows Next button at step 1", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("següent pas")).toBeInTheDocument();
  });
});

describe("Checkout - step navigation", () => {
  it("calls checkoutCart on Next at step 1", async () => {
    const { mockCheckoutCart } = setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    expect(mockCheckoutCart).toHaveBeenCalled();
  });

  it("calls checkoutPaymentCart when not free on Next at step 1", async () => {
    const { mockCheckoutPaymentCart } = setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(mockCheckoutPaymentCart).toHaveBeenCalledWith("cart-uuid-123");
    });
  });

  it("does NOT call checkoutPaymentCart when free on Next at step 1", async () => {
    const { mockCheckoutCart, mockCheckoutPaymentCart } = setupLoggedIn(mockCartFree);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(mockCheckoutCart).toHaveBeenCalled();
    });
    expect(mockCheckoutPaymentCart).not.toHaveBeenCalled();
  });

  it("advances to step 2 after successful checkout", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(getSections()[2].classList.contains("checkout-section--active")).toBe(true);
    });
  });

  it("stays on step 1 when checkoutCart fails", async () => {
    const { mockCheckoutCart } = setupLoggedIn(mockCartRegular);
    mockCheckoutCart.mockRejectedValue(new Error("fail"));
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(getSections()[1].classList.contains("checkout-section--active")).toBe(true);
    });
  });

  it("navigates back to completed section by clicking its header", async () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    // Advance from step 0 to step 1
    fireEvent.click(screen.getByText("següent pas"));
    // Step 0 should be completed
    expect(getSections()[0].classList.contains("checkout-section--completed")).toBe(true);
    // Click step 0 header to go back
    const header = getSections()[0].querySelector(".checkout-section__header");
    fireEvent.click(header);
    await waitFor(() => {
      expect(getSections()[0].classList.contains("checkout-section--active")).toBe(true);
    });
  });

  it("does not navigate when clicking disabled section header", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    // Step 2 is disabled, clicking should not change active step
    const header = getSections()[2].querySelector(".checkout-section__header");
    fireEvent.click(header);
    expect(getSections()[1].classList.contains("checkout-section--active")).toBe(true);
  });
});

describe("Checkout - step 2 (Payment)", () => {
  it("does not show Next button at step 2", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(getSections()[2].classList.contains("checkout-section--active")).toBe(true);
    });
    expect(screen.queryByText("següent pas")).not.toBeInTheDocument();
  });

  it("renders Payment component", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("payment")).toBeInTheDocument();
  });
});

describe("Checkout - step persistence", () => {
  it("saves active step to localStorage", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(localStorage.getItem("checkoutStep")).toBe("1");
  });

  it("restores step from localStorage for subscription cart", () => {
    localStorage.setItem("checkoutStep", "0");
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(getSections()[0].classList.contains("checkout-section--active")).toBe(true);
  });

  it("skips saved step 0 for regular cart (no subscription)", () => {
    localStorage.setItem("checkoutStep", "0");
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(getSections()[1].classList.contains("checkout-section--active")).toBe(true);
  });

  it("updates localStorage when step changes", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(localStorage.getItem("checkoutStep")).toBe("1");
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(localStorage.getItem("checkoutStep")).toBe("2");
    });
  });
});

describe("Checkout - loading state", () => {
  it("shows spinner when loading", async () => {
    const { mockCheckoutCart } = setupLoggedIn(mockCartRegular);
    mockCheckoutCart.mockReturnValue(new Promise(() => {})); // never resolves
    const { container } = renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(container.querySelector(".spinner-border")).toBeInTheDocument();
    });
  });
});

describe("Checkout - fetches member profile on mount", () => {
  it("calls getMemberProfile when user has member profile", () => {
    const { mockGetMemberProfile } = setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(mockGetMemberProfile).toHaveBeenCalled();
  });

  it("does not call getMemberProfile when user has no member profile", () => {
    const { mockGetMemberProfile } = setupLoggedIn(mockCartRegular);
    useAuthStore.setState({ user_data: { member: null } });
    renderWithProviders(<Checkout />);
    expect(mockGetMemberProfile).not.toHaveBeenCalled();
  });
});
