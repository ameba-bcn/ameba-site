import {
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
} from "./types";
import StateService from "./../services/profile.services";

export const setGuestUser = () => ({
  type: GUEST_USER,
});

export const setLoggedUser = () => ({
  type: LOGGED_USER,
});

export const setMember = () => ({
  type: MEMBER_USER,
});

export const subscribeNewsletter = (email) => (dispatch) => {
  return StateService.subscribeNewsletter(email).then(
    (response) => {
      const message = response?.data.detail;
      dispatch({
        type: SUBSCRIBE_SUCCESS,
        payload: message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data.email;
      dispatch({
        type: SUBSCRIBE_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
