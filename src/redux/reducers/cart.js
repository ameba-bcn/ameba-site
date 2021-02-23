import {
    ADD_TO_CART,
    ADD_FAIL,
} from "../actions/types";


const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: payload,
            };
        case ADD_FAIL:
            return {
                ...state,
                cart: [],
            };
        default:
            return state;
    }
}