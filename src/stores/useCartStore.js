import { create } from "zustand";
import CartService from "../store/services/cart.services";
import notificationToast from "../utils/utils";

const PENDING_PAYMENT_KEY = "pendingPayment";

// The backend destroys the Cart the moment it creates a Stripe PaymentIntent
// for it (CartViewSet.payment -> create_payment_and_destroy_cart) — so by
// the time the Payment step is showing, there is no cart left to re-fetch.
// Persisting the Stripe payment details lets a refresh mid-payment resume
// the same PaymentIntent instead of finding an empty cart and bouncing to
// "/" (see Checkout.jsx's route guard).
function loadPendingPayment() {
  try {
    const raw = localStorage.getItem(PENDING_PAYMENT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistPendingPayment(checkout) {
  try {
    if (checkout?.checkout_stripe?.client_secret) {
      localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(checkout));
    } else {
      localStorage.removeItem(PENDING_PAYMENT_KEY);
    }
  } catch {
    // localStorage unavailable (private mode, quota) — payment still
    // works for this tab, it just won't survive a refresh.
  }
}

const useCartStore = create((set, get) => ({
  cart_data: {},
  checkout: loadPendingPayment(),
  stripe: false,
  cartBusy: false,
  // False until the initial getCart() (fired on app mount) settles. Guards
  // like Checkout's "redirect home if the cart is empty" must wait for
  // this instead of judging an empty cart_data={} that just hasn't loaded
  // yet — otherwise a hard refresh on /pagament always bounces to "/".
  cartLoaded: false,

  addToCart: (id) => {
    if (get().cartBusy) return Promise.resolve();
    set({ cartBusy: true });
    return CartService.addInCart(id).then(
      (response) => {
        set({ cart_data: response, cartBusy: false });
      },
      (error) => {
        set({ cartBusy: false });
        const message =
          error.response?.data?.detail ||
          error.response?.data?.item_variant_ids?.[0];
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  substractToCart: (id) => {
    if (get().cartBusy) return Promise.resolve();
    set({ cartBusy: true });
    return CartService.removeItemCart(id).then(
      (response) => {
        set({ cart_data: response, cartBusy: false });
      },
      (error) => {
        set({ cartBusy: false });
        const message =
          error.response?.data?.detail ||
          error.response?.data?.item_variant_ids?.[0];
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  getCart: () => {
    return CartService.getCart().then(
      (response) => {
        set({ cart_data: response, cartLoaded: true });
      },
      (error) => {
        set({ cart_data: {}, cartLoaded: true });
        // Cart not found (expired/deleted) — clean up stale cart_id silently
        if (error.response?.status === 404) {
          localStorage.removeItem("cart_id");
          return;
        }
        const message =
          error.response?.data?.detail ||
          error.response?.data?.item_variant_ids?.[0];
        notificationToast(message, "error");
      }
    );
  },

  checkoutCart: () => {
    return CartService.checkoutCart().then(
      (response) => {
        set({ checkout: response, stripe: true });
        persistPendingPayment(response);
      },
      (error) => {
        const message = error.response?.data?.detail;
        set({ checkout: {}, stripe: false });
        persistPendingPayment({});
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  checkoutPaymentCart: (id) => {
    return CartService.checkoutPaymentCart(id).then(
      (response) => {
        set((state) => {
          const checkout = { ...state.checkout, checkout_stripe: response };
          persistPendingPayment(checkout);
          return { checkout, stripe: true };
        });
      },
      (error) => {
        const message = error?.response?.data?.detail;
        set({ checkout: {}, stripe: false });
        persistPendingPayment({});
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  deleteFullCart: () => {
    return CartService.deleteFullCart().then(
      () => {
        set({ cart_data: {} });
      },
      (error) => {
        const message =
          error.response?.data?.message || error.message || error.toString();
        set({ cart_data: {} });
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  deleteCartAfterCheckout: () => {
    return CartService.deleteCartAfterSuccesfullCheckout().then(
      () => {
        set({ cart_data: {}, checkout: {}, stripe: false });
        persistPendingPayment({});
      },
      (error) => {
        const message =
          error.response?.data?.detail || error.detail || error.toString();
        set({ cart_data: {} });
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  applyDiscount: (item_variants, discountCode) => {
    return CartService.applyDiscount(item_variants, discountCode).then(
      (response) => {
        set({ cart_data: response });
      },
      (error) => {
        const message = error?.response?.data?.discount_code[0];
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  setDeliveryMethod: (payload) => {
    return CartService.setDeliveryMethod(payload).then(
      (response) => {
        set({ cart_data: response });
      },
      (error) => {
        const message =
          error?.response?.data?.detail ||
          error?.response?.data?.shipping_postal_code?.[0] ||
          error?.response?.data?.delivery_method?.[0];
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  clearCart: () => {
    persistPendingPayment({});
    set({ cart_data: {}, checkout: {}, stripe: false });
  },

  clearPendingPayment: () => {
    persistPendingPayment({});
    set({ checkout: {}, stripe: false });
  },
}));

export default useCartStore;
