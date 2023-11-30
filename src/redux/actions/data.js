import {
  GET_ALL_SUPPORT_SUCCESS,
  GET_ALL_SUPPORT_FAIL,
  GET_ALL_AGENDA_SUCCESS,
  GET_ALL_BOTIGA_SUCCESS,
  GET_ALL_BOTIGA_FAIL,
  GET_ALL_MEMBERSHIPS_SUCCESS,
  GET_ALL_MEMBERSHIPS_FAIL,
  GET_ABOUT,
  GET_COVER,
  GET_ALL_AGENDA_FAIL,
  GET_COLLABORATORS,
  GET_MEMBER_PROJECTS,
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
    () => {
      dispatch({
        type: GET_ALL_SUPPORT_FAIL,
      });
    }
  );
};

export const agendaAll = () => (dispatch) => {
  return DataService.agendaAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_AGENDA_SUCCESS,
        payload: response?.data,
      });

      return Promise.resolve();
    },
    () => {
      dispatch({
        type: GET_ALL_AGENDA_FAIL,
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
        payload: response?.data,
      });

      return Promise.resolve();
    },
    () => {
      dispatch({
        type: GET_ALL_BOTIGA_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const membershipAll = () => (dispatch) => {
  return DataService.membershipAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_MEMBERSHIPS_SUCCESS,
        payload: response?.data,
      });

      return Promise.resolve();
    },
    () => {
      dispatch({
        type: GET_ALL_MEMBERSHIPS_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const getAbout = () => (dispatch) => {
  return DataService.getAbout().then((response) => {
    dispatch({
      type: GET_ABOUT,
      payload: response?.data,
    });

    return Promise.resolve();
  });
};

export const getCover = () => (dispatch) => {
  return DataService.getCover().then((response) => {
    dispatch({
      type: GET_COVER,
      payload: response?.data,
    });

    return Promise.resolve();
  });
};

export const getCollaborators = () => (dispatch) => {
  return DataService.getCollaborators().then((response) => {
    dispatch({
      type: GET_COLLABORATORS,
      payload: response?.data,
    });

    return Promise.resolve();
  });
};

export const getMemberProjects = () => (dispatch) => {
  return DataService.getMemberProjects().then((response) => {
    dispatch({
      type: GET_MEMBER_PROJECTS,
      payload: response?.data,
    });

    return Promise.resolve();
  });
};
