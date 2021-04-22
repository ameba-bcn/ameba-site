import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
    SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    LOGOUT,
    SET_MESSAGE,
    // DELETE_CART
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
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
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const validateEmail = (token) => (dispatch) => {
    return AuthService.validateEmail(token).then(
        (response) => {
            dispatch({
                type: VALIDATE_SUCCESS,
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
                type: VALIDATE_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};



export const getUserData = () => (dispatch) => {
    return AuthService.getUserData().then(
        (data) => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: { user: data },
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
                type: GET_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const passwordRecovery = (token, password) => (dispatch) => {
    return AuthService.passwordRecovery(token, password).then(
        (response) => {
            dispatch({
                type: PASSWORD_RECOVERY_SUCCESS,
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
                type: PASSWORD_RECOVERY_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const sendEmailPasswordRecovery = (email) => (dispatch) => {
    return AuthService.sendEmailPasswordRecovery(email).then(
        (response) => {
            dispatch({
                type: SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
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
                type: SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout().then(
        (response) => {
            dispatch({
                type: LOGOUT,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response,
            });
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
};