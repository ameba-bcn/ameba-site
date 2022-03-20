import { OPEN_FULLSCREEN, CLOSE_FULLSCREEN } from "./types";

export const openFullscreen = (message) => ({
    type: OPEN_FULLSCREEN,
    payload: true,
});

export const closeFullscreen = () => ({
    type: CLOSE_FULLSCREEN,
    payload: false,
});