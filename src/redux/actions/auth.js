import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VALIDATE_SUCCESS,
  VALIDATE_FAIL,
  VALIDATE_LOCAL_TOKEN,
  VALIDATE_LOCAL_TOKEN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
  SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_FAIL,
  LOGOUT,
  DELETE_CART,
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  CLEAR_USER_DATA,
  GET_MEMBER_PROFILE,
  GET_MEMBER_PROFILE_FAIL,
  UPDATE_MEMBER_PROFILE,
  CREATE_MEMBER_PROFILE,
  DELETE_USER,
  DELETE_USER_FAIL,
} from "./types";

import AuthService from "../services/auth.service";
import notificationToast from "../../utils/utils";

export const register = (registerData) => (dispatch) => {
  return AuthService.register(registerData).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      notificationToast(response.data.message, "success");

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data.email;
      dispatch({
        type: REGISTER_FAIL,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const getMemberProfile = () => (dispatch) => {
  return AuthService.getMemberProfile().then(
    (response) => {
      dispatch({
        type: GET_MEMBER_PROFILE,
        payload: response,
      });

      if (response?.type === "Socio") {
        dispatch({
          type: MEMBER_USER,
        });
      }

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data.detail;
      dispatch({
        type: GET_MEMBER_PROFILE_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateMemberProfile =
  (identity_card, first_name, last_name, phone_number, username) =>
  (dispatch) => {
    return AuthService.updateMemberProfile(
      identity_card,
      first_name,
      last_name,
      phone_number,
      username
    ).then(
      (response) => {
        dispatch({
          type: UPDATE_MEMBER_PROFILE,
          payload: response,
        });

        dispatch({
          type: GET_MEMBER_PROFILE,
          payload: response,
        });

        notificationToast("Update data member success", "success");

        return Promise.resolve();
      },
      (error) => {
        const message = error.response?.data.detail;

        notificationToast(message, "error");

        return Promise.reject();
      }
    );
  };

export const createMemberProfile =
  (identity_card, first_name, last_name, phone_number) => (dispatch) => {
    return AuthService.createMemberProfile(
      identity_card,
      first_name,
      last_name,
      phone_number
    ).then(
      (response) => {
        dispatch({
          type: CREATE_MEMBER_PROFILE,
        });

        dispatch({
          type: GET_MEMBER_PROFILE,
          payload: response,
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response?.data;

        notificationToast(JSON.stringify(message), "error");

        return Promise.reject();
      }
    );
  };

export const validateEmail = (token) => (dispatch) => {
  return AuthService.validateEmail(token).then(
    () => {
      dispatch({
        type: VALIDATE_SUCCESS,
      });

      // dispatch({
      //   type: CLEAR_MESSAGE,
      // });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: VALIDATE_FAIL,
        payload: message,
      });
      notificationToast(JSON.stringify(message), "error");

      return Promise.reject();
    }
  );
};

export const validateLocalToken = (token) => (dispatch) => {
  return AuthService.validateLocalToken(token).then(
    (response) => {
      dispatch({
        type: VALIDATE_LOCAL_TOKEN,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("cart_id");
      dispatch({
        type: VALIDATE_LOCAL_TOKEN_FAIL,
        payload: message,
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
      dispatch({
        type: LOGGED_USER,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: GUEST_USER,
      });
      notificationToast(message, "error");

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
      const message = error.response?.data?.detail;
      dispatch({
        type: GET_USER_FAIL,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const passwordRecovery = (token, password) => (dispatch) => {
  return AuthService.passwordRecovery(token, password).then(
    (response) => {
      const message = response.detail;

      dispatch({
        type: PASSWORD_RECOVERY_SUCCESS,
      });

      notificationToast(message, "success");

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: PASSWORD_RECOVERY_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const sendEmailPasswordRecovery = (email) => (dispatch) => {
  return AuthService.sendEmailPasswordRecovery(email).then(
    (response) => {
      const message = response.detail;
      dispatch({
        type: SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
      });

      notificationToast(message, "success");

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
        payload: message,
      });

      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout().then(
    (response) => {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: DELETE_CART,
        payload: response,
      });
      dispatch({
        type: GUEST_USER,
      });
      // dispatch({
      //   type: CLEAR_MESSAGE,
      // });
    },
    (error) => {
      const message = error.response?.data;
      dispatch({
        type: DELETE_CART,
      });
      dispatch({
        type: GUEST_USER,
      });
      dispatch({
        type: CLEAR_USER_DATA,
      });
      notificationToast(message, "error");

      return Promise.reject();
    }
  );
};

export const deleteUser = () => (dispatch) => {
  return AuthService.deleteUser().then(
    () => {
      dispatch({
        type: DELETE_USER,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.detail;
      dispatch({
        type: DELETE_USER_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
