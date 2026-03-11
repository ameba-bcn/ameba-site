import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import "./MenuLog.css";
import useOutsideClick from "../../hooks/use-outside-click";
import useUIStore from "../../stores/useUIStore";
import useProfileStore from "../../stores/useProfileStore";
import useAuthStore from "../../stores/useAuthStore";

export default function MenuLog(props) {
  const { isMobile = false } = props;
  const { user_data } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const { isProfileMenuOpen, openProfileMenu, closeProfileMenu, closeMenu } = useUIStore();
  const { user_profile } = useProfileStore();
  const isMember = user_profile === "MEMBER" || "LOGGED";
  const userName = user_data.username.split(" ")[0];
  const userNameShortened =
    userName.length > 7 ? userName.slice(0, 7) + "..." : userName;

  const handleCloseSessio = () => {
    if (isMobile) {
      closeMenu();
    }
    if (!isMobile && isProfileMenuOpen) closeProfileMenu();
  };

  const handleOpenSessio = (isProfileMenuOpen) => {
    isProfileMenuOpen
      ? closeProfileMenu()
      : openProfileMenu();
  };

  const logoutMenu = () => {
    if (isMobile) {
      closeMenu();
    }
    logout();
  };
  const dropdownRef = useRef("menulogprofile");

  useOutsideClick(dropdownRef, () => {
    if (!isMobile && isProfileMenuOpen) handleCloseSessio();
  });

  return (
    <div className="menu-log" ref={dropdownRef}>
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
            <div className="menu-log__item">
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
            </div>
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
    </div>
  );
}
