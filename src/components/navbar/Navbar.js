import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import "./Navbar.scss";
import { MOBILE_BIG } from "../../utils/constants";

export default function Navbar() {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const [click, setClick] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="menuContainer">
      <div className="menuSuperior">
        <div className="menu-logo-box">
          <img
            src={process.env.PUBLIC_URL + "/AmebaLogo.png"}
            className="menuAmebalogo"
            alt="Ameba Logo"
          />
          <NavLink to="/" data-item="AMEBA">
            AMEBA
          </NavLink>
        </div>
        {isMobile ? (
          <div className="menuIcon" onClick={() => handleClick()}>
            {click ? (
              <FaTimes className={"menuIcon__cross"} />
            ) : (
              <FaBars className={"menuIcon__bars"} />
            )}
          </div>
        ) : (
          <NavbarButtons
            isLoggedIn={isLoggedIn}
            handleClick={handleClick}
            click={click}
            isMobile={isMobile}
          />
        )}
      </div>
      {isMobile && click && (
        <NavbarButtonsMobile
          isLoggedIn={isLoggedIn}
          handleClick={handleClick}
          click={click}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
