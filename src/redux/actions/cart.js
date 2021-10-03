import {
  ADD_TO_CART,
  ADD_FAIL,
  SUBS_TO_CART,
  SUBS_FAIL,
  CHECKOUT,
  CHECKOUT_FAIL,
  GET_CART,
  GET_CART_FAIL,
  DELETE_CART,
  DELETE_CART_FAIL,
  DESTROY_CART,
  DESTROY_CART_FAIL,
  SET_MESSAGE,
} from "./types";

import CartService from "../services/cart.services";

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

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

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

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
