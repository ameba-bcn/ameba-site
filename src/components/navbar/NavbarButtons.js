import React from "react";
import { NavLink } from "react-router-dom";
import MenuLog from "./MenuLog";
import Cart from "./Cart";

export default function NavbarButtons(props) {
  const { isLoggedIn = false, handleClick = {}, click } = props;

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
        <li>
          <NavLink to="/booking" data-item="BOOKING">
            BOOKING
          </NavLink>
        </li>

        <div className="liMenuOptions logname-li">
          {!isLoggedIn ? (
            <NavLink to="/login" data-item="LOGIN">
              LOGIN
            </NavLink>
          ) : (
            <MenuLog handleClick={handleClick} />
          )}
        </div>
        <div className="menu-lang">
          <li>
            <a onClick={()=>console.log("Cambia al Catala")} data-item="CAT/">
              CAT/
            </a>
            <a onClick={()=>console.log("Cambia al Castella")} data-item="CAST">
              CAST
            </a>
          </li>
        </div>
        <Cart onClick={handleClick} click={click} />
      </ul>
    </div>
  );
}
