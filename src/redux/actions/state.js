import { GUEST_USER, LOGGED_USER, MEMBER_CANDIDATE } from "./types";

export const setGuestUser = () => ({
    type: GUEST_USER
});

export const setLoggedUser = () => ({
    type: LOGGED_USER
});

export const setMemberCandidate = () => ({
    type: MEMBER_CANDIDATE
});