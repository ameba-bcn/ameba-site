import {
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_CART_MENU,
  CLOSE_CART_MENU,
  OPEN_PROFILE_MENU,
  CLOSE_PROFILE_MENU,
} from "../actions/types";

const initialState = {
  isMenuOpen: false,
  isCartMenuOpen: false,
  isProfileMenuOpen: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case OPEN_MENU:
      return { ...state, isMenuOpen: true };
    case CLOSE_MENU:
      return { ...state, isMenuOpen: false };
    case OPEN_CART_MENU:
      return { ...state, isCartMenuOpen: true };
    case CLOSE_CART_MENU:
      return { ...state, isCartMenuOpen: false };
    case OPEN_PROFILE_MENU:
      return { ...state, isProfileMenuOpen: true };
    case CLOSE_PROFILE_MENU:
      return { ...state, isProfileMenuOpen: false };

    default:
      return state;
  }
}
