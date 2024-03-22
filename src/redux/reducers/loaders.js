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

const initialState = {
  isManifestoLoading: false,
  isArtistLoading: false,
  isEventsLoading: false,
  isSubscriptionsLoading: false,
  isMemberProjectsLoading: false,
  isAboutLoading: false,
  isCoversLoading: false,
  isArtistsLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_MANIFESTO:
      return { ...state, isManifestoLoading: payload };

    case LOADING_ARTISTS:
      return { ...state, isArtistLoading: payload };

    case LOADING_EVENTS:
      return { ...state, isEventsLoading: payload };

    case LOADING_SUBSCRIPTIONS:
      return { ...state, isSubscriptionsLoading: payload };

    case LOADING_MEMBER_PROJECTS:
      return { ...state, isMemberProjectsLoading: payload };

    case LOADING_ABOUT:
      return { ...state, isAboutLoading: payload };

    case LOADING_COVERS:
      return { ...state, isCoversLoading: payload };

    case LOADING_ARTICLES:
      return { ...state, isArtistsLoading: payload };

    case LOADING_GALERIA:
      return { ...state, isGaleriaLoading: payload };

    default:
      return state;
  }
}
