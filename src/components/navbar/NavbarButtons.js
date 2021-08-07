import React from "react";
import { NavLink } from "react-router-dom";
import MenuLog from "./MenuLog";
import Cart from "./Cart";

export default function NavbarButtons(props) {
  const { isLoggedIn = false } = props;

  return (
    <div className="menuButtons">
      <ul className="nav-ul">
        <li>
          <NavLink to="/activitats" data-item="AGENDA">
            AGENDA
          </NavLink>
        </li>
        <li>
          <NavLink to="/botiga" data-item="BOTIGA">
            BOTIGA
          </NavLink>
        </li>
        <li>
          <NavLink to="/support" data-item="#SUPPORTYOURLOCALS">
            #SUPPORTYOURLOCALS
          </NavLink>
        </li>

        <div className="liMenuOptions logname-li">
          {!isLoggedIn ? (
            <NavLink to="/login" data-item="LOGIN">
              LOGIN
            </NavLink>
          ) : (
            <MenuLog />
          )}
        </div>
        <Cart />
      </ul>
    </div>
  );
}
