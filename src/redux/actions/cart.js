import {
    ADD_TO_CART,
    ADD_FAIL,
    SET_MESSAGE,
} from "./types";

import CartService from "../services/cart.services";

export const addToCart = (id) => (dispatch) => {
    return CartService.addInCart(id).then(
        (response) => {
            dispatch({
                type: ADD_TO_CART,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
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
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
