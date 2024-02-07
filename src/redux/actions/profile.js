import {
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  STORE_UPLOADED_IMAGES,
} from "./types";
import stateService from "./../services/profile.services";
import notificationToast from "../../utils/utils";

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
  return stateService.subscribeNewsletter(email).then(
    (response) => {
      const message = response?.data.detail;
      notificationToast(message, "success");

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.email;
      notificationToast(message, "error");
      return Promise.reject();
    }
  );
};

export const setUploadedImages = (url) => (dispatch) => {
  dispatch({
    type: STORE_UPLOADED_IMAGES,
    payload: url,
  });

  return Promise.resolve();
};

export const getQrData = (token) => (dispatch) => {
  return stateService.getCarnet(token).then(
    (response) => {
      dispatch({
        type: GET_QR_DATA,
        payload: response,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data.detail;
      notificationToast(message, "error");
      return Promise.reject();
    }
  );
};
