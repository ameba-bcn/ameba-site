import {
  ADD_TO_CART,
  ADD_FAIL,
  ADD_MEMBER_TO_CART,
  ADD_MEMBER_FAIL,
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
} from "../actions/types";

const initialState = {
  cart_data: {},
  checkout: {},
  stripe: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart_data: payload,
      };
    case ADD_FAIL:
      return {
        ...state,
        cart_data: state.cart_data,
      };
    case ADD_MEMBER_TO_CART:
      return {
        ...state,
        cart_data: payload,
      };
    case ADD_MEMBER_FAIL:
      return {
        ...state,
        cart_data: state.cart_data,
      };
    case SUBS_TO_CART:
      return {
        ...state,
        cart_data: payload,
      };
    case SUBS_FAIL:
      return {
        ...state,
        cart_data: state.cart_data,
      };
    case CHECKOUT:
      return {
        ...state,
        checkout: payload,
        stripe: true,
      };
    case CHECKOUT_FAIL:
      return {
        ...state,
        checkout: {},
        stripe: false,
      };
    case CHECKOUT_PAYMENT:
      return {
        ...state,
        checkout: { ...state.checkout, checkout_stripe: payload },
        stripe: true,
      };
    case CHECKOUT_PAYMENT_FAIL:
      return {
        ...state,
        checkout: {},
        stripe: false,
      };
    case GET_CART:
      return {
        ...state,
        cart_data: payload,
      };
    case GET_CART_FAIL:
      return {
        ...state,
        cart_data: {},
      };
    case DELETE_CART:
      return {
        ...state,
        cart_data: {},
      };
    case DELETE_CART_FAIL:
      return {
        ...state,
        cart_data: {},
      };
    case DESTROY_CART:
      return {
        ...state,
        cart_data: {},
        checkout: {},
        stripe: false,
      };
    case DESTROY_CART_FAIL:
      return {
        ...state,
        cart_data: {},
      };
    case DISCOUNT_CODE_APPLIED:
      return {
        ...state,
      };
    case DISCOUNT_CODE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
