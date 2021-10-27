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
  const userName = user_data.username.split(' ')
  const handleCloseSessio = () => {
    handleClick();
    setAnchorEl1(null);
  };

  const handleClickSessio = (event) => {
    setAnchorEl1(event.currentTarget);
    setMobileMenuOpen(!mobileMenuOpen)
  };

  const logoutMenu = () => {
    handleClick();
    dispatch(logout());
  };
  return (
    <div>
      <a
        className="sessio-menu-button"
        data-item={user_data.username === "" ? "SESSIÓ" : userName[0]}
        onClick={(e) => handleClickSessio(e)}
      >
        {user_data.username === "" ? "SESSIÓ" : userName[0]}
      </a>
      {!isMobile ?<Menu
        id="simple-menu"
        anchorEl={anchorEl1}
        keepMounted
        className="menuDropdownCart"
        disableAutoFocusItem
        open={Boolean(anchorEl1)}
        onClose={handleCloseSessio}
      >
        <div>
          <NavLink className="menuOptions" to="/profile">
            {isMember && (
              <div
                className="dropdown-profile"
                onClick={() => handleCloseSessio()}
              >
                Perfil
              </div>
            )}
          </NavLink>
          <div className="dropdown-logout" onClick={() => logoutMenu()}>
            Log out
          </div>
        </div>
      </Menu>: 
        (mobileMenuOpen&& 
        <div className="menu-mobile-session-box">
          <div className="menu-mobile-session">
        <NavLink className="menuOptions" to="/profile">
          {isMember && (
            <div
              className="dropdown-profile-mobile"
              onClick={() => handleCloseSessio()}
            >
              Perfil
            </div>
          )}
        </NavLink>
        <div 
        className="dropdown-logout-mobile" 
        onClick={() => logoutMenu()}>
          Log out
        </div>
        </div>
      </div>)
      }
    </div>
  );
}
