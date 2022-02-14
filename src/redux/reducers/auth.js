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
  VALIDATE_LOCAL_TOKEN,
  VALIDATE_LOCAL_TOKEN_FAIL,
  CLEAR_USER_DATA,
  GET_MEMBER_PROFILE,
  GET_MEMBER_PROFILE_FAIL,
  UPDATE_MEMBER_PROFILE,
  CREATE_MEMBER_PROFILE,
  DELETE_USER,
  DELETE_USER_FAIL,
} from "../actions/types";

const access = localStorage.getItem("access");
const refresh = localStorage.getItem("refresh");

const user = { access, refresh };
const user_data = {
  username: "",
  password: "",
  email: "",
  member: "",
  date_joined: "",
};

const user_member_data = {
  address: "",
  first_name: "",
  last_name: "",
  number: 0,
  phone_number: "",
  user: 0,
};
const initialState = access
  ? { isLoggedIn: true, user, user_data, user_member_data }
  : { isLoggedIn: false, user: null, user_data, user_member_data };

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
    case GET_MEMBER_PROFILE:
      return {
        ...state,
        user_member_data: payload,
      };
    case UPDATE_MEMBER_PROFILE:
      return {
        ...state,
        user_member_data: payload,
      };
    case CREATE_MEMBER_PROFILE:
      return {
        ...state,
        user_member_data: payload,
      };
    case GET_MEMBER_PROFILE_FAIL:
      return {
        ...state,
        user_member_data: {},
      };
    case VALIDATE_SUCCESS:
      return {
        ...state,
      };
    case VALIDATE_FAIL:
      return {
        ...state,
      };
    case VALIDATE_LOCAL_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case VALIDATE_LOCAL_TOKEN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
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
    case GET_USER_SUCCESS:
      return {
        ...state,
        user_data: payload.user,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        user_data: user_data,
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
        user_data: user_data,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        user_data: user_data,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
