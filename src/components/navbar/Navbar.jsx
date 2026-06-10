import React, { useRef, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import "./Navbar.style.css";
import useMediaQuery from "../../hooks/use-media-query";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
export default function Navbar({ isErrored = false }) {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useAuthStore();
  const ref = useRef(null);
  const toggleRef = useRef(null);
  const { isMenuOpen, openMenu, closeMenu } = useUIStore();
  const [hidden, setHidden] = useState(false);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    setHidden(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setHidden(false);
    }, 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className={`navbar${hidden && !isMenuOpen ? " navbar--hidden" : ""}`}>
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
                <button
                  ref={toggleRef}
                  className={`menu-icon${isMenuOpen ? " menu-icon--open" : ""}`}
                  onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
                  aria-label="Menu"
                >
                  <span className="menu-icon__bar" />
                  <span className="menu-icon__bar" />
                  <span className="menu-icon__bar" />
                </button>
              )
            : !isErrored && <NavbarButtons isLoggedIn={isLoggedIn} />}
        </div>
        {isMobile && !isErrored && (
          <NavbarButtonsMobile isLoggedIn={isLoggedIn} refer={ref} toggleRef={toggleRef} isOpen={isMenuOpen} />
        )}
      </div>
    </div>
  );
}
