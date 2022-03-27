import { OPEN_FULLSCREEN, CLOSE_FULLSCREEN, OPEN_SITE_UNAVAILABLE, CLOSE_SITE_UNAVAILABLE } from "../actions/types";

const initialState = { isOpen: false, isSiteUnavailableOpen: true };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case OPEN_FULLSCREEN:
            return { ...state, isOpen: payload };

        case CLOSE_FULLSCREEN:
            return { ...state, isOpen: payload };

        case OPEN_SITE_UNAVAILABLE:
            return { ...state, isSiteUnavailableOpen: payload };

        case CLOSE_SITE_UNAVAILABLE:
            return { ...state, isSiteUnavailableOpen: payload };

        default:
            return state;
    }
}