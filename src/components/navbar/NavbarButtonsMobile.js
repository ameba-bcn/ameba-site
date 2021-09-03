import React from "react";
import { NavLink } from "react-router-dom";
import MenuLog from "./MenuLog";
import Cart from "./Cart";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, click, handleClick } = props;

  return (
    <div className="nav-ul_box-mobile">
      {click && (
        <ul className="nav-ul_mobile">
          <li>
            <NavLink to="/activitats" data-item="AGENDA" onClick={handleClick}>
              AGENDA
            </NavLink>
          </li>
          <li>
            <NavLink to="/botiga" data-item="BOTIGA" onClick={handleClick}>
              BOTIGA
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              data-item="#SUPPORTYOURLOCALS"
              onClick={handleClick}
            >
              #SUPPORTYOURLOCALS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"
              data-item="#SUPPORTYOURLOCALS"
              onClick={handleClick}
            >
              #BOOKING
            </NavLink>
          </li>
          <div className="liMenuOptions logname-li">
            {!isLoggedIn ? (
              <NavLink to="/login" data-item="LOGIN" onClick={handleClick}>
                LOGIN
              </NavLink>
            ) : (
              <MenuLog handleClick={handleClick} />
            )}
          </div>
          <Cart isMobile onClick={handleClick} click={click} />
        </ul>
      )}
    </div>
  );
}
