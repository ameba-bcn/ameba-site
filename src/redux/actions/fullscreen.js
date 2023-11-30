import {
  OPEN_FULLSCREEN,
  CLOSE_FULLSCREEN,
  OPEN_SITE_UNAVAILABLE,
  CLOSE_SITE_UNAVAILABLE,
} from "./types";

export const openFullscreen = () => ({
  type: OPEN_FULLSCREEN,
  payload: true,
});

export const closeFullscreen = () => ({
  type: CLOSE_FULLSCREEN,
  payload: false,
});

export const openSiteUnavailable = () => ({
  type: OPEN_SITE_UNAVAILABLE,
  payload: true,
});

export const closeSiteUnavailable = () => ({
  type: CLOSE_SITE_UNAVAILABLE,
  payload: false,
});
