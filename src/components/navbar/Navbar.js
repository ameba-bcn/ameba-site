import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import { StyledNavbar } from "./StyledNavbar";
import { useMenuHandler } from "./use-menu-handler";

export default function Navbar() {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [{ openMenu, closeMenu }, { isMenuOpen }] = useMenuHandler();

  return (
    <StyledNavbar>
      <div className="menuContainer">
        <div className="menuSuperior">
          <div className="menu-logo-box">
            <img
              // eslint-disable-next-line no-undef
              src={process.env.PUBLIC_URL + "/AmebaLogo.png"}
              className="menuAmebalogo"
              alt="Ameba Logo"
            />
            <NavLink to="/" data-item="AMEBA">
              AMEBA
            </NavLink>
            <NavLink to="/" data-item="AMEBA">
              AMEBA
            </NavLink>
          </div>
          {isMobile ? (
            <div className="menuIcon">
              {isMenuOpen ? (
                <FaTimes className={"menuIcon__cross"} onClick={closeMenu} />
              ) : (
                <FaBars className={"menuIcon__bars"} onClick={openMenu} />
              )}
            </div>
          ) : (
            <NavbarButtons isLoggedIn={isLoggedIn} handleClick={closeMenu} />
          )}
        </div>
        {isMobile && isMenuOpen && (
          <NavbarButtonsMobile
            isLoggedIn={isLoggedIn}
            handleClick={closeMenu}
          />
        )}
      </div>
    </StyledNavbar>
  );
}
