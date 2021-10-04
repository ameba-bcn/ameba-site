import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { logout } from "../../redux/actions/auth";

export default function MenuLog(props) {
  const { handleClick = {} } = props;
  const { user_data } = useSelector((state) => state.auth);
  const { user_profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const isMember = user_profile === "MEMBER" || "LOGGED";
  const userName = user_data.username.split(' ')
  const handleCloseSessio = () => {
    handleClick();
    setAnchorEl1(null);
  };

  const handleClickSessio = (event) => {
    setAnchorEl1(event.currentTarget);
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
      </Menu>
    </div>
  );
}
