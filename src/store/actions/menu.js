import {
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_CART_MENU,
  CLOSE_CART_MENU,
  OPEN_PROFILE_MENU,
  CLOSE_PROFILE_MENU,
} from "./types";

export const setOpenMenu = () => ({
  type: OPEN_MENU,
});

export const setCloseMenu = () => ({
  type: CLOSE_MENU,
});

export const setOpenCartMenu = () => ({
  type: OPEN_CART_MENU,
});

export const setCloseCartMenu = () => ({
  type: CLOSE_CART_MENU,
});

export const setOpenProfileMenu = () => ({
  type: OPEN_PROFILE_MENU,
});

export const setCloseProfileMenu = () => ({
  type: CLOSE_PROFILE_MENU,
});
