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
let toast;
beforeEach(async () => {
  const mod = await import("../store/services/cart.services");
  CartService = mod.default;
  toast = (await import("react-toastify")).toast;
  vi.clearAllMocks();
});

// notificationToast() passes toast.error/.success a lazily-evaluated
// finalMessage function rather than a plain string — unwrap it to assert content.
const lastToastMessage = (mock) => mock.mock.calls.at(-1)[0]();

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

describe("useCartStore - error message content", () => {
  it("addToCart toasts the detail message when present", async () => {
    CartService.addInCart.mockRejectedValue({
      response: { data: { detail: "Producte esgotat" } },
    });
    try {
      await useCartStore.getState().addToCart(1);
    } catch {
      /* expected */
    }
    expect(lastToastMessage(toast.error)).toBe("Producte esgotat");
  });

  it("addToCart falls back to item_variant_ids[0] when detail is missing", async () => {
    CartService.addInCart.mockRejectedValue({
      response: { data: { item_variant_ids: ["Variant invàlida"] } },
    });
    try {
      await useCartStore.getState().addToCart(1);
    } catch {
      /* expected */
    }
    expect(lastToastMessage(toast.error)).toBe("Variant invàlida");
  });

  it("substractToCart toasts the detail message when present", async () => {
    CartService.removeItemCart.mockRejectedValue({
      response: { data: { detail: "No es pot eliminar" } },
    });
    try {
      await useCartStore.getState().substractToCart(1);
    } catch {
      /* expected */
    }
    expect(lastToastMessage(toast.error)).toBe("No es pot eliminar");
  });

  it("getCart toasts on non-404 errors without touching localStorage", async () => {
    localStorage.setItem("cart_id", "keep-me");
    CartService.getCart.mockRejectedValue({
      response: { status: 500, data: { detail: "Error de servidor" } },
    });
    await useCartStore.getState().getCart();
    expect(lastToastMessage(toast.error)).toBe("Error de servidor");
    expect(localStorage.getItem("cart_id")).toBe("keep-me");
  });

  it("applyDiscount toasts the discount_code error", async () => {
    CartService.applyDiscount.mockRejectedValue({
      response: { data: { discount_code: ["Codi caducat"] } },
    });
    try {
      await useCartStore.getState().applyDiscount([1], "OLD");
    } catch {
      /* expected */
    }
    expect(lastToastMessage(toast.error)).toBe("Codi caducat");
  });
});

describe("useCartStore - deleteCartAfterCheckout error path", () => {
  it("clears cart_data but preserves nothing else on failure, and toasts", async () => {
    useCartStore.setState({
      cart_data: { id: "123" },
      checkout: { amount: 2500 },
      stripe: true,
    });
    CartService.deleteCartAfterSuccesfullCheckout.mockRejectedValue({
      response: { data: { detail: "No s'ha pogut netejar la cistella" } },
    });

    await expect(
      useCartStore.getState().deleteCartAfterCheckout(),
    ).rejects.toBeUndefined();

    expect(useCartStore.getState().cart_data).toEqual({});
    expect(lastToastMessage(toast.error)).toBe(
      "No s'ha pogut netejar la cistella",
    );
  });
});

describe("useCartStore - cartBusy guard under real async timing", () => {
  it("blocks a second addToCart while the first is still pending", async () => {
    let resolveFirst;
    CartService.addInCart.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve;
        }),
    );

    const first = useCartStore.getState().addToCart(1);
    expect(useCartStore.getState().cartBusy).toBe(true);

    // Fired while busy: should no-op instead of calling the service again
    await useCartStore.getState().addToCart(1);
    expect(CartService.addInCart).toHaveBeenCalledTimes(1);

    resolveFirst({ id: "123", item_variants: [{ id: 1 }] });
    await first;
    expect(useCartStore.getState().cartBusy).toBe(false);
  });

  it("allows a new addToCart once the previous one has resolved", async () => {
    CartService.addInCart.mockResolvedValue({ id: "123" });
    await useCartStore.getState().addToCart(1);
    await useCartStore.getState().addToCart(2);
    expect(CartService.addInCart).toHaveBeenCalledTimes(2);
  });
});

describe("useCartStore - full lifecycle battery", () => {
  it("walks through add -> add -> remove -> discount -> checkout -> payment -> post-checkout cleanup", async () => {
    const store = () => useCartStore.getState();

    CartService.addInCart.mockResolvedValueOnce({
      id: "cart-1",
      item_variant_ids: [1],
      item_variants: [{ id: 1 }],
    });
    await store().addToCart(1);
    expect(useCartStore.getState().cart_data.item_variant_ids).toEqual([1]);

    CartService.addInCart.mockResolvedValueOnce({
      id: "cart-1",
      item_variant_ids: [1, 2],
      item_variants: [{ id: 1 }, { id: 2 }],
    });
    await store().addToCart(2);
    expect(useCartStore.getState().cart_data.item_variant_ids).toEqual([1, 2]);

    CartService.removeItemCart.mockResolvedValueOnce({
      id: "cart-1",
      item_variant_ids: [2],
      item_variants: [{ id: 2 }],
    });
    await store().substractToCart(1);
    expect(useCartStore.getState().cart_data.item_variant_ids).toEqual([2]);

    CartService.applyDiscount.mockResolvedValueOnce({
      id: "cart-1",
      item_variant_ids: [2],
      total: "20.00 €",
    });
    await store().applyDiscount([2], "AMEBA20");
    expect(useCartStore.getState().cart_data.total).toBe("20.00 €");

    CartService.checkoutCart.mockResolvedValueOnce({ amount: 2000, id: "checkout-1" });
    await store().checkoutCart();
    expect(useCartStore.getState().checkout.amount).toBe(2000);
    expect(useCartStore.getState().stripe).toBe(true);

    CartService.checkoutPaymentCart.mockResolvedValueOnce({
      client_secret: "pi_1",
      stripe_public: "pk_1",
    });
    await store().checkoutPaymentCart("cart-1");
    expect(useCartStore.getState().checkout.checkout_stripe).toEqual({
      client_secret: "pi_1",
      stripe_public: "pk_1",
    });

    CartService.deleteCartAfterSuccesfullCheckout.mockResolvedValueOnce();
    await store().deleteCartAfterCheckout();
    expect(useCartStore.getState().cart_data).toEqual({});
    expect(useCartStore.getState().checkout).toEqual({});
    expect(useCartStore.getState().stripe).toBe(false);
  });

  it("recovers cleanly when checkoutCart fails mid-lifecycle, leaving the cart intact for retry", async () => {
    useCartStore.setState({ cart_data: { id: "cart-1", item_variant_ids: [1] } });
    CartService.checkoutCart.mockRejectedValueOnce({
      response: { data: { detail: "Stock insuficient" } },
    });

    try {
      await useCartStore.getState().checkoutCart();
    } catch {
      /* expected */
    }
    expect(useCartStore.getState().checkout).toEqual({});
    expect(useCartStore.getState().stripe).toBe(false);
    // cart_data itself is untouched by a checkoutCart failure, so the user can retry
    expect(useCartStore.getState().cart_data).toEqual({
      id: "cart-1",
      item_variant_ids: [1],
    });

    CartService.checkoutCart.mockResolvedValueOnce({ amount: 2500 });
    await useCartStore.getState().checkoutCart();
    expect(useCartStore.getState().checkout.amount).toBe(2500);
    expect(useCartStore.getState().stripe).toBe(true);
  });
});
