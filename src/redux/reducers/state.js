import { GUEST_USER, LOGGED_USER, MEMBER_CANDIDATE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL } from "../actions/types";

const initialState = { user_state: "" };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case GUEST_USER:
            return { user_state: "GUEST" };

        case LOGGED_USER:
            return { user_state: "LOGGED" };

        case MEMBER_CANDIDATE:
            return { user_state: "MEMBER_CANDIDATE" };

        case SUBSCRIBE_SUCCESS:
            return {
                ...state,
            };

        case SUBSCRIBE_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
}