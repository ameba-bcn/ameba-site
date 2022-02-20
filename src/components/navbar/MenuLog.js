import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { logout } from "../../redux/actions/auth";

export default function MenuLog(props) {
  const { isMobile, handleClick = {} } = props;
  const { user_data } = useSelector((state) => state.auth);
  const { user_profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMember = user_profile === "MEMBER" || "LOGGED";
  const userName = user_data.username.split(" ")[0];
  const userNameShortened =
    userName.length > 7 ? userName.slice(0, 7) + "..." : userName;

  const handleCloseSessio = () => {
    handleClick();
    setAnchorEl1(null);
  };

  const handleClickSessio = (event) => {
    setAnchorEl1(event.currentTarget);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logoutMenu = () => {
    handleClick();
    dispatch(logout());
  };
  return (
    <div>
      <a
        className="sessio-menu-button"
        data-item={user_data.username === "" ? "SESSIÓ" : userNameShortened}
        onClick={(e) => handleClickSessio(e)}
      >
        {user_data.username === "" ? "SESSIÓ" : userNameShortened}
      </a>
      {!isMobile ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl1}
          keepMounted
          className="menuDropdownCart"
          disableAutoFocusItem
          open={Boolean(anchorEl1)}
          onClose={handleCloseSessio}
        >
          <div>
            <NavLink
              className="menuOptions"
              to="/profile"
              onClick={() => handleCloseSessio()}
            >
              {isMember && <div className="dropdown-profile">Perfil</div>}
            </NavLink>
            <div className="dropdown-logout" onClick={() => logoutMenu()}>
              Log out
            </div>
          </div>
        </Menu>
      ) : (
        mobileMenuOpen && (
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
  );
}
