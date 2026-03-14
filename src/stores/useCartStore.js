import { create } from "zustand";
import CartService from "../store/services/cart.services";
import notificationToast from "../utils/utils";

const useCartStore = create((set, get) => ({
  cart_data: {},
  checkout: {},
  stripe: false,
  cartBusy: false,

  addToCart: (id) => {
    if (get().cartBusy) return Promise.resolve();
    set({ cartBusy: true });
    return CartService.addInCart(id).then(
      (response) => {
        set({ cart_data: response, cartBusy: false });
      },
      (error) => {
        set({ cartBusy: false });
        const message = error.response?.data?.detail;
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
        const message = error.response?.data?.detail;
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  getCart: () => {
    return CartService.getCart().then(
      (response) => {
        set({ cart_data: response });
      },
      (error) => {
        const message = error.response?.data?.detail;
        set({ cart_data: {} });
        return Promise.reject(message);
      }
    );
  },

  checkoutCart: () => {
    return CartService.checkoutCart().then(
      (response) => {
        set({ checkout: response, stripe: true });
      },
      (error) => {
        const message = error.response?.data?.detail;
        set({ checkout: {}, stripe: false });
        notificationToast(message, "error");
        return Promise.reject();
      }
    );
  },

  checkoutPaymentCart: (id) => {
    return CartService.checkoutPaymentCart(id).then(
      (response) => {
        set((state) => ({
          checkout: { ...state.checkout, checkout_stripe: response },
          stripe: true,
        }));
      },
      (error) => {
        const message = error?.response?.data?.detail;
        set({ checkout: {}, stripe: false });
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

  clearCart: () => set({ cart_data: {} }),
}));

export default useCartStore;
