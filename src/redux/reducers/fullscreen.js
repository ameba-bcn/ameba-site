import { OPEN_FULLSCREEN, CLOSE_FULLSCREEN } from "../actions/types";

const initialState = {isOpen: false};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case OPEN_FULLSCREEN:
            return { isOpen: payload };

        case CLOSE_FULLSCREEN:
            return { isOpen: payload };

        default:
            return state;
    }
}