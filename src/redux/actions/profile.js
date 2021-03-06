import {
    GUEST_USER, LOGGED_USER, MEMBER_CANDIDATE,
    SET_MESSAGE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL
} from "./types";
import StateService from './../services/profile.services'

export const setGuestUser = () => ({
    type: GUEST_USER
});

export const setLoggedUser = () => ({
    type: LOGGED_USER
});

export const setMemberCandidate = () => ({
    type: MEMBER_CANDIDATE
});

export const subscribeNewsletter = (email) => (dispatch) => {
    return StateService.subscribeNewsletter(email).then(
        (response) => {
            const message = response.data.detail
            dispatch({
                type: SUBSCRIBE_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.email
            dispatch({
                type: SUBSCRIBE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
