import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import Dropdown from "../dropdown/Dropdown";
import styled from "styled-components";
import useOutsideClick from "../../hooks/use-outside-click";
import {
  setCloseMenu,
  setCloseProfileMenu,
  setOpenProfileMenu,
} from "../../store/actions/menu";

export const StyledMenuLog = styled.div`
  position: relative;
`;

export const StyledMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .item {
    color: #1d1d1b;
    font-family: "Bebas Neue";
    font-size: 30px;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export default function MenuLog(props) {
  const { isMobile = false } = props;
  const { user_data } = useSelector((state) => state.auth);
  const { isProfileMenuOpen } = useSelector((state) => state.menu);
  const { user_profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const isMember = user_profile === "MEMBER" || "LOGGED";
  const userName = user_data.username.split(" ")[0];
  const userNameShortened =
    userName.length > 7 ? userName.slice(0, 7) + "..." : userName;

  const handleCloseSessio = () => {
    if (isMobile) {
      dispatch(setCloseMenu());
    }
    if (!isMobile && isProfileMenuOpen) dispatch(setCloseProfileMenu());
  };

  const handleOpenSessio = (isProfileMenuOpen) => {
    isProfileMenuOpen
      ? dispatch(setCloseProfileMenu())
      : dispatch(setOpenProfileMenu());
  };

  const logoutMenu = () => {
    if (isMobile) {
      dispatch(setCloseMenu());
    }
    dispatch(logout());
  };
  const dropdownRef = useRef("menulogprofile");

  useOutsideClick(dropdownRef, () => {
    if (!isMobile && isProfileMenuOpen) handleCloseSessio();
  });

  return (
    <StyledMenuLog ref={dropdownRef}>
      <a
        className="sessio-menu-button"
        data-item={user_data.username === "" ? "SESSIÓ" : userNameShortened}
        onClick={() => handleOpenSessio(isProfileMenuOpen)}
      >
        {user_data.username === "" ? "SESSIÓ" : userNameShortened}
      </a>
      <div ref={dropdownRef}>
        {!isMobile ? (
          <Dropdown
            open={isProfileMenuOpen}
            setIsOpen={handleCloseSessio}
            externalClickOutside={true}
          >
            <StyledMenuItem>
              <NavLink
                className="menuOptions"
                to="/profile"
                onClick={() => handleCloseSessio()}
              >
                {isMember && (
                  <div className="dropdown-profile item">Perfil</div>
                )}
              </NavLink>
              <div
                className="dropdown-logout item"
                onClick={() => logoutMenu()}
              >
                Log out
              </div>
            </StyledMenuItem>
          </Dropdown>
        ) : (
          isProfileMenuOpen && (
            <div className="menu-mobile-session-box">
              <div className="menu-mobile-session">
                <NavLink
                  className="menuOptions"
                  to="/profile"
                  onClick={() => handleCloseSessio()}
                >
                  {isMember && (
                    <div className="dropdown-profile-mobile">Perfil</div>
                  )}
                </NavLink>
                <div
                  className="dropdown-logout-mobile"
                  onClick={() => logoutMenu()}
                >
                  Log out
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </StyledMenuLog>
  );
}
