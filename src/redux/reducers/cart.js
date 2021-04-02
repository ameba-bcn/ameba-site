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
    DESTROY_CART,
    DESTROY_CART_FAIL
} from "../actions/types";

const initialState = {
    cart_data: {},
    checkout: {},
    stripe: false
};

// eslint-disable-next-line import/no-anonymous-default-export
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
                stripe: true
            };
        case CHECKOUT_FAIL:
            return {
                ...state,
                checkout: {},
                stripe: false
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
        case DESTROY_CART:
            return {
                ...state,
                cart_data: {},
                checkout: {},
                stripe: false
            };
        case DESTROY_CART_FAIL:
            return {
                ...state,
                cart_data: {},
            };
        default:
            return state;
    }
}