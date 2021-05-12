import { GUEST_USER, LOGGED_USER } from "./types";

export const setGuestUser = () => ({
    type: GUEST_USER
});

export const setLoggedUser = () => ({
    type: LOGGED_USER
});