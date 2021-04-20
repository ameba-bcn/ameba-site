import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
    SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case VALIDATE_SUCCESS:
            return {
                ...state,
            };
        case VALIDATE_FAIL:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS:
            return {
                ...state,
            };
        case SEND_EMAIL_PASSWORD_RECOVERY_FAIL:
            return {
                ...state,
            };
        case PASSWORD_RECOVERY_SUCCESS:
            return {
                ...state,
            };
        case PASSWORD_RECOVERY_FAIL:
            return {
                ...state,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}