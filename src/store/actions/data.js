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
import {
  articlesLoading,
  artistsLoading,
  coversLoading,
  eventsLoading,
  manifestoLoading,
  memberProjectsLoading,
  subscriptionsLoading,
} from "./loaders";

export const supportYourLocalsAll = () => (dispatch) => {
  dispatch(artistsLoading(true));
  return DataService.supportYourLocalsAll()
    .then(
      (response) => {
        dispatch(artistsLoading(false));

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
    )
    .catch(() => {
      dispatch(artistsLoading(false));
    });
};

export const agendaAll = () => (dispatch) => {
  dispatch(eventsLoading(true));
  return DataService.agendaAll()
    .then(
      (response) => {
        dispatch(eventsLoading(false));
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
    )
    .catch(() => {
      dispatch(eventsLoading(false));
    });
};

export const botigaAll = () => (dispatch) => {
  dispatch(articlesLoading(true));
  return DataService.botigaAll()
    .then(
      (response) => {
        dispatch(articlesLoading(false));

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
    )
    .catch(() => {
      dispatch(articlesLoading(false));
    });
};

export const membershipAll = () => (dispatch) => {
  dispatch(subscriptionsLoading(true));
  return DataService.membershipAll()
    .then(
      (response) => {
        dispatch(subscriptionsLoading(false));
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
    )
    .catch(() => {
      dispatch(subscriptionsLoading(false));
    });
};

export const getAbout = () => (dispatch) => {
  dispatch(manifestoLoading(true));
  return DataService.getAbout()
    .then((response) => {
      dispatch(manifestoLoading(false));
      dispatch({
        type: GET_ABOUT,
        payload: response?.data,
      });

      return Promise.resolve();
    })
    .catch(() => {
      dispatch(manifestoLoading(false));
    });
};

export const getCover = () => (dispatch) => {
  dispatch(coversLoading(true));
  return DataService.getCover()
    .then((response) => {
      dispatch(coversLoading(false));
      dispatch({
        type: GET_COVER,
        payload: response?.data,
      });

      return Promise.resolve();
    })
    .catch(() => {
      dispatch(coversLoading(false));
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
  dispatch(memberProjectsLoading(true));

  return DataService.getMemberProjects()
    .then((response) => {
      dispatch(memberProjectsLoading(false));

      dispatch({
        type: GET_MEMBER_PROJECTS,
        payload: response?.data,
      });

      return Promise.resolve();
    })
    .catch(() => {
      dispatch(memberProjectsLoading(false));
    });
};
