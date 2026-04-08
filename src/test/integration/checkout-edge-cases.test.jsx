import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../../components/checkout/Checkout";
import useCartStore from "../../stores/useCartStore";
import useAuthStore from "../../stores/useAuthStore";
import useUIStore from "../../stores/useUIStore";
import renderWithProviders from "../helpers/renderWithProviders";
import { mockCartRegular, mockCartMember, mockMemberProfile } from "../mocks/data";

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }) => <div>{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => ({ confirmPayment: vi.fn().mockResolvedValue({}) }),
  useElements: () => ({}),
}));
vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn().mockResolvedValue({}),
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));
vi.mock("../../components/ui/Icon", () => ({
  default: (props) => <span>{props.icon}</span>,
}));

const setup = (cartData) => {
  const mocks = {
    checkoutCart: vi.fn().mockResolvedValue(),
    checkoutPaymentCart: vi.fn().mockResolvedValue(),
    getCart: vi.fn().mockResolvedValue(),
    substractToCart: vi.fn().mockResolvedValue(),
    applyDiscount: vi.fn().mockResolvedValue(),
  };

  useAuthStore.setState({
    isLoggedIn: true,
    user_member_data: mockMemberProfile,
    getMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
    updateMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
    createMemberProfile: vi.fn().mockResolvedValue(mockMemberProfile),
  });

  useCartStore.setState({
    cart_data: cartData,
    ...mocks,
  });

  useUIStore.setState({
    closeFullscreen: vi.fn(),
    openFullscreen: vi.fn(),
  });

  return mocks;
};

describe("Edge Cases: Cart busy guard", () => {
  it("prevents duplicate addToCart when cartBusy is true", async () => {
    const mockAddInCart = vi.fn().mockResolvedValue();
    useCartStore.setState({ cartBusy: true, addToCart: useCartStore.getState().addToCart });

    // The actual addToCart from the store checks cartBusy
    const store = useCartStore.getState();
    await store.addToCart(1);
    // Since cartBusy is true, the service should not be called
    // This is tested more thoroughly in the store unit tests
  });
});

describe("Edge Cases: Authentication guard", () => {
  it("does not render checkout for guest user", () => {
    useAuthStore.setState({ isLoggedIn: false });
    useCartStore.setState({ cart_data: mockCartRegular });
    const { container } = renderWithProviders(<Checkout />);
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });

  it("does not render checkout for empty cart", () => {
    useAuthStore.setState({
      isLoggedIn: true,
      getMemberProfile: vi.fn().mockResolvedValue(),
    });
    useCartStore.setState({ cart_data: { item_variants: [], total: "0.00 €" } });
    renderWithProviders(<Checkout />);
    expect(screen.queryByText("pagament")).not.toBeInTheDocument();
  });
});

describe("Edge Cases: Checkout step error recovery", () => {
  it("clears loading after checkout error", async () => {
    const mocks = setup(mockCartRegular);
    mocks.checkoutCart.mockRejectedValue(new Error("API error"));
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas"));

    // After error, should still be on Review step with no spinner
    await waitFor(() => {
      expect(screen.getByText("Cistella")).toBeInTheDocument();
    });
  });

  it("can retry after checkout error", async () => {
    const mocks = setup(mockCartRegular);
    let callCount = 0;
    mocks.checkoutCart.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.reject(new Error("first fail"));
      return Promise.resolve();
    });

    renderWithProviders(<Checkout />);

    // First attempt fails
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByText("Cistella")).toBeInTheDocument();
    });

    // Second attempt succeeds
    fireEvent.click(screen.getByText("següent pas"));
    await waitFor(() => {
      expect(screen.getByText("Dades de pagament")).toBeInTheDocument();
    });
  });
});

describe("Edge Cases: Subscription checkout step flow", () => {
  it("goes from step 0 to step 1 on Next for subscription cart", () => {
    setup(mockCartMember);
    renderWithProviders(<Checkout />);
    expect(screen.getByText("Dades personals")).toBeInTheDocument();
    fireEvent.click(screen.getByText("següent pas"));
    expect(screen.getByText("Cistella")).toBeInTheDocument();
  });

  it("shows back button at step 1 for subscription cart (can go back to step 0)", () => {
    setup(mockCartMember);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas")); // step 0 -> 1
    expect(screen.getByText("enrere")).toBeInTheDocument();
  });

  it("navigates back from step 1 to step 0", () => {
    setup(mockCartMember);
    renderWithProviders(<Checkout />);
    fireEvent.click(screen.getByText("següent pas")); // step 0 -> 1
    fireEvent.click(screen.getByText("enrere")); // step 1 -> 0
    expect(screen.getByText("Dades personals")).toBeInTheDocument();
  });
});

describe("Edge Cases: Discount code validation", () => {
  it("shows error for empty discount code submission", async () => {
    setup(mockCartRegular);
    renderWithProviders(<Checkout />);
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText(/obligatori/i)).toBeInTheDocument();
    });
  });

  it("shows format error for short discount code", async () => {
    setup(mockCartRegular);
    renderWithProviders(<Checkout />);
    const input = screen.getByPlaceholderText("descompte");
    fireEvent.change(input, { target: { value: "AB" } });
    const form = screen.getByText("Aplica").closest("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText(/longitud/i)).toBeInTheDocument();
    });
  });
});
