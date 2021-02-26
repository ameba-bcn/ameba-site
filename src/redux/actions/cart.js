import {
    ADD_TO_CART,
    ADD_FAIL,
    SUBS_TO_CART,
    SUBS_FAIL,
    CHECKOUT,
    CHECKOUT_FAIL
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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SUBS_FAIL,
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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: CHECKOUT_FAIL,
                payload: message,
            });

            return Promise.reject();
        }
    );
};




