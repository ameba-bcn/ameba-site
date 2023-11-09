import {
  ADD_TO_CART,
  ADD_FAIL,
  SUBS_TO_CART,
  SUBS_FAIL,
  CHECKOUT,
  CHECKOUT_FAIL,
  CHECKOUT_PAYMENT,
  CHECKOUT_PAYMENT_FAIL,
  GET_CART,
  GET_CART_FAIL,
  DELETE_CART,
  DELETE_CART_FAIL,
  DESTROY_CART,
  DESTROY_CART_FAIL,
  DISCOUNT_CODE_APPLIED,
  DISCOUNT_CODE_FAIL,
} from "./types";

import CartService from "../services/cart.services";
import notificationToast from "../../utils/utils";

export const addToCart = (id) => (dispatch) => {
  return CartService.addInCart(id).then(
    (response) => {
      dispatch({
        type: ADD_TO_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;

      dispatch({
        type: ADD_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const substractToCart = (id) => (dispatch) => {
  return CartService.removeItemCart(id).then(
    (response) => {
      dispatch({
        type: SUBS_TO_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;

      dispatch({
        type: SUBS_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const getCart = () => (dispatch) => {
  return CartService.getCart().then(
    (response) => {
      dispatch({
        type: GET_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;

      dispatch({
        type: GET_CART_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkoutCart = () => (dispatch) => {
  return CartService.checkoutCart().then(
    (response) => {
      dispatch({
        type: CHECKOUT,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: CHECKOUT_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const checkoutPaymentCart = (id) => (dispatch) => {
  return CartService.checkoutPaymentCart(id).then(
    (response) => {
      dispatch({
        type: CHECKOUT_PAYMENT,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error?.response?.data?.detail;
      dispatch({
        type: CHECKOUT_PAYMENT_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const deleteFullCart = () => (dispatch) => {
  return CartService.deleteFullCart().then(
    (response) => {
      dispatch({
        type: DELETE_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_CART_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const deleteCartAfterCheckout = () => (dispatch) => {
  return CartService.deleteCartAfterSuccesfullCheckout().then(
    (response) => {
      dispatch({
        type: DESTROY_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.detail ||
        error.toString();

      dispatch({
        type: DESTROY_CART_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const applyDiscount = (item_variants, discountCode) => (dispatch) => {
  return CartService.applyDiscount(item_variants, discountCode).then(
    (response) => {
      dispatch({
        type: DISCOUNT_CODE_APPLIED,
        payload: response,
      });

      dispatch({
        type: GET_CART,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error?.response?.data?.discount_code[0];
      dispatch({
        type: DISCOUNT_CODE_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};
