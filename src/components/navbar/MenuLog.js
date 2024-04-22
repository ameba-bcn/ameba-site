import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import Dropdown from "../dropdown/Dropdown";
import styled from "styled-components";

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
  const {
    isMobile = false,
    closeMenu = {},
    isProfileMenuOpen = false,
    openProfileMenu = {},
    closeProfileMenu = {},
  } = props;
  const { user_data } = useSelector((state) => state.auth);
  const { user_profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const isMember = user_profile === "MEMBER" || "LOGGED";
  const userName = user_data.username.split(" ")[0];
  const userNameShortened =
    userName.length > 7 ? userName.slice(0, 7) + "..." : userName;

  const handleCloseSessio = () => {
    if (isMobile) {
      closeMenu();
    }
    closeProfileMenu();
    setAnchorEl1(null);
  };

  const handleOpenSessio = (event) => {
    setAnchorEl1(event.currentTarget);
    isProfileMenuOpen ? handleCloseSessio() : openProfileMenu();
  };

  const logoutMenu = () => {
    if (isMobile) {
      closeMenu();
    }
    dispatch(logout());
  };
  const dropdownRef1 = React.useRef(null);

  return (
    <StyledMenuLog>
      <a
        className="sessio-menu-button"
        data-item={user_data.username === "" ? "SESSIÓ" : userNameShortened}
        onClick={(e) => handleOpenSessio(e)}
      >
        {user_data.username === "" ? "SESSIÓ" : userNameShortened}
      </a>
      {!isMobile ? (
        <Dropdown
          refer={dropdownRef1}
          open={Boolean(anchorEl1)}
          setIsOpen={handleCloseSessio}
        >
          <StyledMenuItem>
            <NavLink
              className="menuOptions"
              to="/profile"
              onClick={() => handleCloseSessio()}
            >
              {isMember && <div className="dropdown-profile item">Perfil</div>}
            </NavLink>
            <div className="dropdown-logout item" onClick={() => logoutMenu()}>
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
    </StyledMenuLog>
  );
}
