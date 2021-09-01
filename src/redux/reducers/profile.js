import {
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  MEMBER_CANDIDATE_USER,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
} from "../actions/types";

const initialState = { user_profile: "" };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case GUEST_USER:
      return { user_profile: "GUEST" };

    case LOGGED_USER:
      return { user_profile: "LOGGED" };

    case MEMBER_USER:
      return { user_profile: "MEMBER" };

    case MEMBER_CANDIDATE_USER:
      return { user_profile: "MEMBER_CANDIDATE" };

    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
      };

    case SUBSCRIBE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
