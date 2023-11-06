import {
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
} from "../actions/types";

const initialState = { user_profile: "", message: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GUEST_USER:
      return { ...state, user_profile: "GUEST" };

    case LOGGED_USER:
      return { ...state, user_profile: "LOGGED" };

    case MEMBER_USER:
      return { ...state, user_profile: "MEMBER" };

    case SUBSCRIBE_SUCCESS:
    case SUBSCRIBE_FAIL:
      return {
        ...state,
        message: payload,
      };

    default:
      return state;
  }
}
