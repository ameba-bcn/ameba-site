import { GUEST_USER, LOGGED_USER } from "../actions/types";

const initialState = {user_state:""};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case GUEST_USER:
            return { user_state: "GUEST" };

        case LOGGED_USER:
            return { user_state: "LOGGED" };

        default:
            return state;
    }
}