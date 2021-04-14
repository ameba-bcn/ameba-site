import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
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

export const validateEmail = () => (dispatch) => {
    return AuthService.validateEmail().then(
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

export const passwordRecovery = () => (dispatch) => {
    return AuthService.passwordRecovery().then(
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