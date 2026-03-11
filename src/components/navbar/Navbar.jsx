import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import "./Navbar.style.css";
import Icon from "../ui/Icon";
import useMediaQuery from "../../hooks/use-media-query";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
export default function Navbar({ isErrored = false }) {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useAuthStore();
  const ref = useRef("navbarButtonsMobileRef");
  const { isMenuOpen, openMenu, closeMenu } = useUIStore();

  return (
    <div className="navbar">
      <div className="menuContainer">
        <div className="menuSuperior">
          <div className="menu-logo-box">
            <img
              src="/AmebaLogo.png"
              className="menuAmebalogo"
              alt="Ameba Logo"
            />
            <NavLink to="/" data-item="AMEBA">
              AMEBA
            </NavLink>
          </div>
          {isMobile
            ? !isErrored && (
                <div className="menu-icon">
                  {isMenuOpen ? (
                    <Icon
                      icon="clear"
                      className="menuIcon__cross"
                      onClick={() => closeMenu()}
                      type="hoverable-dark"
                    />
                  ) : (
                    <Icon
                      icon="menu"
                      className="menuIcon__bars"
                      onClick={() => openMenu()}
                      type="hoverable-dark"
                    />
                  )}
                </div>
              )
            : !isErrored && <NavbarButtons isLoggedIn={isLoggedIn} />}
        </div>
        {isMobile && isMenuOpen && (
          <NavbarButtonsMobile isLoggedIn={isLoggedIn} refer={ref} />
        )}
      </div>
    </div>
  );
}
