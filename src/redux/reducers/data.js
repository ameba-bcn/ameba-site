import {
  GET_ALL_SUPPORT_SUCCESS,
  GET_ALL_SUPPORT_FAIL,
  GET_ALL_AGENDA_SUCCESS,
  GET_ALL_AGENDA_FAIL,
  GET_ALL_BOTIGA_SUCCESS,
  GET_ALL_BOTIGA_FAIL,
  GET_ALL_MEMBERSHIPS_SUCCESS,
  GET_ALL_MEMBERSHIPS_FAIL,
  GET_ABOUT,
  GET_COVER,
} from "../actions/types";

const initialState = {
  support: [],
  agenda: [],
  botiga: [],
  about: {},
  cover: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_SUPPORT_SUCCESS:
      return {
        ...state,
        support: payload,
      };

    case GET_ALL_SUPPORT_FAIL:
      return {
        ...state,
      };
    case GET_ALL_AGENDA_SUCCESS:
      return {
        ...state,
        agenda: payload,
      };

    case GET_ALL_AGENDA_FAIL:
      return {
        ...state,
      };
    case GET_ALL_BOTIGA_SUCCESS:
      return {
        ...state,
        botiga: payload,
      };

    case GET_ALL_BOTIGA_FAIL:
      return {
        ...state,
      };
    case GET_ALL_MEMBERSHIPS_SUCCESS:
      return {
        ...state,
        membership: payload,
      };
    case GET_ALL_MEMBERSHIPS_FAIL:
      return {
        ...state,
      };
    case GET_ABOUT:
      return {
        ...state,
        about: payload,
      };
    case GET_COVER:
      return {
        ...state,
        cover: payload,
      };
    default:
      return state;
  }
}
