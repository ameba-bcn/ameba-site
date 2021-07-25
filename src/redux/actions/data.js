import {
  SET_MESSAGE,
  GET_ALL_SUPPORT_SUCCESS,
  GET_ALL_SUPPORT_FAIL,
  GET_ALL_AGENDA_SUCCESS,
  GET_ALL_AGENDA_FAIL,
  GET_ALL_BOTIGA_SUCCESS,
  GET_ALL_BOTIGA_FAIL,
  GET_ABOUT,
} from "./types";
import DataService from "../services/data.service";

export const supportYourLocalsAll = () => (dispatch) => {
  return DataService.supportYourLocalsAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_SUPPORT_SUCCESS,
        payload: response?.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data;
      dispatch({
        type: GET_ALL_SUPPORT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const agendaAll = () => (dispatch) => {
  return DataService.agendaAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_AGENDA_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data;
      dispatch({
        type: GET_ALL_AGENDA_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const botigaAll = () => (dispatch) => {
  return DataService.botigaAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_BOTIGA_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data;
      dispatch({
        type: GET_ALL_BOTIGA_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAbout = () => (dispatch) => {
  return DataService.getAbout().then((response) => {
    dispatch({
      type: GET_ABOUT,
      payload: response.data,
    });

    return Promise.resolve();
  });
};
