import {
  GUEST_USER,
  LOGGED_USER,
  MEMBER_USER,
  STORE_UPLOADED_IMAGES,
} from "../actions/types";

const initialState = { user_profile: "", images: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GUEST_USER:
      return { ...state, user_profile: "GUEST" };

    case LOGGED_USER:
      return { ...state, user_profile: "LOGGED" };

    case MEMBER_USER:
      return { ...state, user_profile: "MEMBER" };

    case STORE_UPLOADED_IMAGES:
      return {
        ...state,
        images: [...state.images, payload],
      };

    default:
      return state;
  }
}
