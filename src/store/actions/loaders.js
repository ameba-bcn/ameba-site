import {
  LOADING_MANIFESTO,
  LOADING_ARTISTS,
  LOADING_EVENTS,
  LOADING_SUBSCRIPTIONS,
  LOADING_MEMBER_PROJECTS,
  LOADING_ABOUT,
  LOADING_COVERS,
  LOADING_ARTICLES,
  LOADING_GALERIA,
} from "../actions/types";

export const manifestoLoading = (payload) => ({
  type: LOADING_MANIFESTO,
  payload: payload,
});

export const artistsLoading = (payload) => ({
  type: LOADING_ARTISTS,
  payload: payload,
});

export const eventsLoading = (payload) => ({
  type: LOADING_EVENTS,
  payload: payload,
});

export const subscriptionsLoading = (payload) => ({
  type: LOADING_SUBSCRIPTIONS,
  payload: payload,
});

export const memberProjectsLoading = (payload) => ({
  type: LOADING_MEMBER_PROJECTS,
  payload: payload,
});

export const aboutLoading = (payload) => ({
  type: LOADING_ABOUT,
  payload: payload,
});

export const coversLoading = (payload) => ({
  type: LOADING_COVERS,
  payload: payload,
});

export const articlesLoading = (payload) => ({
  type: LOADING_ARTICLES,
  payload: payload,
});

export const galeriaLoading = (payload) => ({
  type: LOADING_GALERIA,
  payload: payload,
});
