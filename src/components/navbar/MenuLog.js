import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { logout } from "../../redux/actions/auth";

export default function MenuLog(props) {
  const { handleClick = {} } = props;
  const { user_data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);

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
        data-item={user_data.username === "" ? "SESSIÓ" : user_data.username}
        onClick={(e) => handleClickSessio(e)}
      >
        {user_data.username === "" ? "SESSIÓ" : user_data.username}
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
            <div
              className="dropdown-profile"
              onClick={() => handleCloseSessio()}
            >
              Perfil
            </div>
          </NavLink>
          <div className="dropdown-logout" onClick={() => logoutMenu()}>
            Log out
          </div>
        </div>
      </Menu>
    </div>
  );
}
