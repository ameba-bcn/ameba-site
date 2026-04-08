import { describe, it, expect, vi, beforeEach } from "vitest";
import useCartStore from "./useCartStore";

vi.mock("../store/services/cart.services", () => ({
  default: {
    addInCart: vi.fn(),
    removeItemCart: vi.fn(),
    getCart: vi.fn(),
    checkoutCart: vi.fn(),
    checkoutPaymentCart: vi.fn(),
    deleteFullCart: vi.fn(),
    deleteCartAfterSuccesfullCheckout: vi.fn(),
    applyDiscount: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

let CartService;
beforeEach(async () => {
  const mod = await import("../store/services/cart.services");
  CartService = mod.default;
  vi.clearAllMocks();
});

describe("useCartStore - initial state", () => {
  it("has empty cart_data by default", () => {
    expect(useCartStore.getState().cart_data).toEqual({});
  });

  it("has empty checkout by default", () => {
    expect(useCartStore.getState().checkout).toEqual({});
  });

  it("has cartBusy as false by default", () => {
    expect(useCartStore.getState().cartBusy).toBe(false);
  });
});

describe("useCartStore - addToCart", () => {
  it("sets cart_data on successful add", async () => {
    const mockResponse = { id: "123", item_variants: [{ id: 1 }] };
    CartService.addInCart.mockResolvedValue(mockResponse);

    await useCartStore.getState().addToCart(1);
    expect(useCartStore.getState().cart_data).toEqual(mockResponse);
    expect(useCartStore.getState().cartBusy).toBe(false);
  });

  it("does not call service when cartBusy is true", async () => {
    useCartStore.setState({ cartBusy: true });
    await useCartStore.getState().addToCart(1);
    expect(CartService.addInCart).not.toHaveBeenCalled();
  });

  it("sets cartBusy false on error", async () => {
    CartService.addInCart.mockRejectedValue({ response: { data: { detail: "Error" } } });
    try {
      await useCartStore.getState().addToCart(1);
    } catch { /* expected */ }
    expect(useCartStore.getState().cartBusy).toBe(false);
  });
});

describe("useCartStore - substractToCart", () => {
  it("sets cart_data on successful remove", async () => {
    const mockResponse = { id: "123", item_variants: [] };
    CartService.removeItemCart.mockResolvedValue(mockResponse);

    await useCartStore.getState().substractToCart(1);
    expect(useCartStore.getState().cart_data).toEqual(mockResponse);
    expect(useCartStore.getState().cartBusy).toBe(false);
  });

  it("does not call service when cartBusy is true", async () => {
    useCartStore.setState({ cartBusy: true });
    await useCartStore.getState().substractToCart(1);
    expect(CartService.removeItemCart).not.toHaveBeenCalled();
  });

  it("sets cartBusy false on error", async () => {
    CartService.removeItemCart.mockRejectedValue({ response: { data: { detail: "Error" } } });
    try {
      await useCartStore.getState().substractToCart(1);
    } catch { /* expected */ }
    expect(useCartStore.getState().cartBusy).toBe(false);
  });
});

describe("useCartStore - getCart", () => {
  it("sets cart_data on success", async () => {
    const mockResponse = { id: "123", item_variants: [{ id: 1 }] };
    CartService.getCart.mockResolvedValue(mockResponse);

    await useCartStore.getState().getCart();
    expect(useCartStore.getState().cart_data).toEqual(mockResponse);
  });

  it("sets empty cart_data on error", async () => {
    CartService.getCart.mockRejectedValue({ response: { status: 500, data: { detail: "Error" } } });
    await useCartStore.getState().getCart();
    expect(useCartStore.getState().cart_data).toEqual({});
  });

  it("silently removes cart_id on 404", async () => {
    localStorage.setItem("cart_id", "old-cart");
    CartService.getCart.mockRejectedValue({ response: { status: 404 } });
    await useCartStore.getState().getCart();
    expect(localStorage.getItem("cart_id")).toBeNull();
  });
});

describe("useCartStore - checkoutCart", () => {
  it("sets checkout data and stripe=true on success", async () => {
    const mockResponse = { amount: 2500, checkout_stripe: {} };
    CartService.checkoutCart.mockResolvedValue(mockResponse);

    await useCartStore.getState().checkoutCart();
    expect(useCartStore.getState().checkout).toEqual(mockResponse);
    expect(useCartStore.getState().stripe).toBe(true);
  });

  it("resets checkout and stripe=false on failure", async () => {
    CartService.checkoutCart.mockRejectedValue({ response: { data: { detail: "Error" } } });
    try {
      await useCartStore.getState().checkoutCart();
    } catch { /* expected */ }
    expect(useCartStore.getState().checkout).toEqual({});
    expect(useCartStore.getState().stripe).toBe(false);
  });
});

describe("useCartStore - checkoutPaymentCart", () => {
  it("merges checkout_stripe into existing checkout", async () => {
    useCartStore.setState({ checkout: { amount: 2500 } });
    const stripeData = { client_secret: "pi_123", stripe_public: "pk_123" };
    CartService.checkoutPaymentCart.mockResolvedValue(stripeData);

    await useCartStore.getState().checkoutPaymentCart("cart-uuid");
    const state = useCartStore.getState();
    expect(state.checkout.amount).toBe(2500);
    expect(state.checkout.checkout_stripe).toEqual(stripeData);
    expect(state.stripe).toBe(true);
  });

  it("resets on failure", async () => {
    CartService.checkoutPaymentCart.mockRejectedValue({ response: { data: { detail: "Error" } } });
    try {
      await useCartStore.getState().checkoutPaymentCart("cart-uuid");
    } catch { /* expected */ }
    expect(useCartStore.getState().checkout).toEqual({});
    expect(useCartStore.getState().stripe).toBe(false);
  });
});

describe("useCartStore - deleteFullCart", () => {
  it("clears cart_data on success", async () => {
    useCartStore.setState({ cart_data: { id: "123" } });
    CartService.deleteFullCart.mockResolvedValue();

    await useCartStore.getState().deleteFullCart();
    expect(useCartStore.getState().cart_data).toEqual({});
  });

  it("clears cart_data even on error", async () => {
    useCartStore.setState({ cart_data: { id: "123" } });
    CartService.deleteFullCart.mockRejectedValue(new Error("fail"));
    try {
      await useCartStore.getState().deleteFullCart();
    } catch { /* expected */ }
    expect(useCartStore.getState().cart_data).toEqual({});
  });
});

describe("useCartStore - deleteCartAfterCheckout", () => {
  it("clears all cart state on success", async () => {
    useCartStore.setState({ cart_data: { id: "123" }, checkout: { amount: 25 }, stripe: true });
    CartService.deleteCartAfterSuccesfullCheckout.mockResolvedValue();

    await useCartStore.getState().deleteCartAfterCheckout();
    expect(useCartStore.getState().cart_data).toEqual({});
    expect(useCartStore.getState().checkout).toEqual({});
    expect(useCartStore.getState().stripe).toBe(false);
  });
});

describe("useCartStore - applyDiscount", () => {
  it("updates cart_data with discounted response", async () => {
    const discountedCart = { id: "123", total: "20.00 €" };
    CartService.applyDiscount.mockResolvedValue(discountedCart);

    await useCartStore.getState().applyDiscount([1], "AMEBA20");
    expect(useCartStore.getState().cart_data).toEqual(discountedCart);
  });

  it("rejects on failure", async () => {
    CartService.applyDiscount.mockRejectedValue({
      response: { data: { discount_code: ["Invalid code"] } },
    });
    await expect(useCartStore.getState().applyDiscount([1], "BAD")).rejects.toBeUndefined();
  });
});

describe("useCartStore - clearCart", () => {
  it("sets cart_data to empty object", () => {
    useCartStore.setState({ cart_data: { id: "123" } });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().cart_data).toEqual({});
  });
});
