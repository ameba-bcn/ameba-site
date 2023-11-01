import { useReducer } from "react";

export const useMenuHandler = () => {
  const actions = {
    OPEN_MENU: "OPEN_MENU",
    CLOSE_MENU: "CLOSE_MENU",
    OPEN_CART_MENU: "OPEN_CART_MENU",
    CLOSE_CART_MENU: "CLOSE_CART_MENU",
    OPEN_PROFILE_MENU: "OPEN_PROFILE_MENU",
    CLOSE_PROFILE_MENU: "CLOSE_PROFILE_MENU",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "OPEN_MENU":
        return { ...state, isMenuOpen: true };
      case "CLOSE_MENU":
        return { ...state, isMenuOpen: false };
      case "OPEN_CART_MENU":
        return { ...state, isCartMenuOpen: true };
      case "CLOSE_CART_MENU":
        return { ...state, isCartMenuOpen: false };
      case "OPEN_PROFILE_MENU":
        return { ...state, isProfileMenuOpen: true };
      case "CLOSE_PROFILE_MENU":
        return { ...state, isProfileMenuOpen: false };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    isMenuOpen: false,
    isCartMenuOpen: false,
    isProfileMenuOpen: false,
  });

  const openMenu = () => {
    dispatch({ type: actions.OPEN_MENU });
  };

  const closeMenu = () => {
    dispatch({ type: actions.CLOSE_MENU });
  };

  const openCartMenu = () => {
    dispatch({ type: actions.OPEN_CART_MENU });
    dispatch({ type: actions.CLOSE_PROFILE_MENU });
  };

  const closeCartMenu = () => {
    dispatch({ type: actions.CLOSE_CART_MENU });
  };

  const openProfileMenu = () => {
    dispatch({ type: actions.OPEN_PROFILE_MENU });
    dispatch({ type: actions.CLOSE_CART_MENU });
  };

  const closeProfileMenu = () => {
    dispatch({ type: actions.CLOSE_PROFILE_MENU });
  };

  return [
    {
      openMenu,
      closeMenu,
      openCartMenu,
      closeCartMenu,
      openProfileMenu,
      closeProfileMenu,
    },
    state,
  ];
};
