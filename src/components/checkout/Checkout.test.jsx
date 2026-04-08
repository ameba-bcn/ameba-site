import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "./Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useUIStore from "../../stores/useUIStore";
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
  default: ({ setButtonDisabled }) => (
    <div data-testid="membership-form-layout">MembershipFormLayout</div>
  ),
}));
vi.mock("../forms/MembershipForm/MembershipFormReadOnly", () => ({
  default: () => <div data-testid="membership-form-readonly">MembershipFormReadOnly</div>,
}));
vi.mock("../stepper/Stepper", () => ({
  default: ({ arraySteps, activeStep }) => (
    <div data-testid="stepper" data-active-step={activeStep}>
      {arraySteps.map((s, i) => (
        <span key={i} data-testid={`step-${i}`}>{s}</span>
      ))}
    </div>
  ),
}));
vi.mock("../button/Button", () => ({
  default: ({ children, onClick, disabled, ...rest }) => (
    <button onClick={onClick} disabled={disabled} data-testid={`btn-${typeof children === 'string' ? children : 'action'}`}>
      {children}
    </button>
  ),
}));

const setupLoggedIn = (cartData) => {
  const mockCheckoutCart = vi.fn().mockResolvedValue();
  const mockCheckoutPaymentCart = vi.fn().mockResolvedValue();
  const mockGetCart = vi.fn().mockResolvedValue();
  const mockGetMemberProfile = vi.fn().mockResolvedValue();
  const mockCloseFullscreen = vi.fn();

  useAuthStore.setState({
    isLoggedIn: true,
    getMemberProfile: mockGetMemberProfile,
  });
  useCartStore.setState({
    cart_data: cartData,
    checkoutCart: mockCheckoutCart,
    checkoutPaymentCart: mockCheckoutPaymentCart,
    getCart: mockGetCart,
  });
  useUIStore.setState({
    closeFullscreen: mockCloseFullscreen,
  });

  return { mockCheckoutCart, mockCheckoutPaymentCart, mockGetCart, mockGetMemberProfile, mockCloseFullscreen };
};

describe("Checkout - route guards", () => {
  it("redirects to / when user is not logged in", () => {
    useAuthStore.setState({ isLoggedIn: false });
    useCartStore.setState({ cart_data: mockCartRegular });
    const { container } = renderWithProviders(<Checkout />, { route: "/checkout" });
    // Navigate component renders nothing visible
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });

  it("redirects to / when cart has no items", () => {
    useAuthStore.setState({ isLoggedIn: true, getMemberProfile: vi.fn().mockResolvedValue() });
    useCartStore.setState({ cart_data: { item_variants: [] } });
    const { container } = renderWithProviders(<Checkout />, { route: "/checkout" });
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });

  it("does not redirect when logged in with items", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />, { route: "/checkout" });
    expect(screen.getByText("pagament")).toBeInTheDocument();
  });
});

describe("Checkout - stepper initialization", () => {
  it("starts at step 1 when no subscription items", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    // Should show Review (step 1)
    expect(screen.getByTestId("review")).toBeInTheDocument();
  });

  it("starts at step 0 when cart has subscription items", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    // Should show membership form (step 0)
    expect(screen.getByTestId("membership-form-layout")).toBeInTheDocument();
  });

  it("renders Stepper component", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });
});

describe("Checkout - step 0 (Membership)", () => {
  it("renders MembershipFormLayout for subscription cart", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("membership-form-layout")).toBeInTheDocument();
  });

  it("shows Next button at step 0", () => {
    setupLoggedIn(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("següent pas")).toBeInTheDocument();
  });
});

describe("Checkout - step 1 (Review)", () => {
  it("renders Review at step 1", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("review")).toBeInTheDocument();
  });

  it("shows Next button at step 1", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("següent pas")).toBeInTheDocument();
  });

  it("shows subtitle Cistella at step 1", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    // Subtitle is in checkout-subtitle class
    const subtitle = document.querySelector(".checkout-subtitle");
    expect(subtitle.textContent).toBe("Cistella");
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
    const { mockCheckoutCart, mockCheckoutPaymentCart } = setupLoggedIn(mockCartRegular);
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
      expect(screen.getByTestId("payment")).toBeInTheDocument();
    });
  });

  it("stays on step 1 when checkoutCart fails", async () => {
    const { mockCheckoutCart } = setupLoggedIn(mockCartRegular);
    mockCheckoutCart.mockRejectedValue(new Error("fail"));
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByTestId("review")).toBeInTheDocument();
    });
  });
});

describe("Checkout - step 2 (Payment)", () => {
  it("shows Exit button at step 2", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByTestId("payment")).toBeInTheDocument();
    });
    expect(screen.getByText("sortir")).toBeInTheDocument();
  });

  it("does not show Next button at step 2", async () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByTestId("payment")).toBeInTheDocument();
    });
    expect(screen.queryByText("següent pas")).not.toBeInTheDocument();
  });

  it("calls closeFullscreen and getCart when Exit clicked at step 2", async () => {
    const { mockCloseFullscreen, mockGetCart } = setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByTestId("payment")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("sortir"));
    expect(mockCloseFullscreen).toHaveBeenCalled();
    expect(mockGetCart).toHaveBeenCalled();
  });
});

describe("Checkout - loading state", () => {
  it("shows spinner when loading", async () => {
    const { mockCheckoutCart } = setupLoggedIn(mockCartRegular);
    // Make checkoutCart take a long time
    mockCheckoutCart.mockReturnValue(new Promise(() => {})); // never resolves
    const { container } = renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(container.querySelector(".spinner-border")).toBeInTheDocument();
    });
  });
});

describe("Checkout - i18n", () => {
  it("renders Catalan step labels by default", () => {
    setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(screen.getByTestId("step-1").textContent).toBe("Cistella");
  });
});

describe("Checkout - fetches member profile on mount", () => {
  it("calls getMemberProfile on mount", () => {
    const { mockGetMemberProfile } = setupLoggedIn(mockCartRegular);
    renderWithProviders(<Checkout />);
    expect(mockGetMemberProfile).toHaveBeenCalled();
  });
});
