import { GET_ALL_SUPPORT_SUCCESS, GET_ALL_SUPPORT_FAIL, GET_ALL_AGENDA_SUCCESS, GET_ALL_AGENDA_FAIL, GET_ALL_BOTIGA_SUCCESS, GET_ALL_BOTIGA_FAIL, GET_ABOUT } from "../actions/types";

const initialState = { support: {}, agenda: {}, botiga: {} }
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_SUPPORT_SUCCESS:
            return {
                ...state,
                support: payload
            };

        case GET_ALL_SUPPORT_FAIL:
            return {
                ...state
            };
        case GET_ALL_AGENDA_SUCCESS:
            return {
                ...state,
                agenda: payload
            };

        case GET_ALL_AGENDA_FAIL:
            return {
                ...state
            };
        case GET_ALL_BOTIGA_SUCCESS:
            return {
                ...state,
                botiga: payload
            };

        case GET_ALL_BOTIGA_FAIL:
            return {
                ...state
            };
        case GET_ABOUT:
            return {
                ...state,
                about: payload
            };
        default:
            return state;
    }


}