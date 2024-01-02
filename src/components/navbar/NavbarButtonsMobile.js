import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import MenuLog from "./MenuLog";
import Cart from "./Cart";
import { useTranslation } from "react-i18next";
import { useMenuHandler } from "./use-menu-handler";
import useOutsideClick from "../../hooks/use-outside-click";

export default function NavbarButtonsMobile(props) {
  const ref = useRef();
  const { isLoggedIn = false, handleClick: closeMenu } = props;
  const [t, i18next] = useTranslation("translation");
  const [
    { openCartMenu, closeCartMenu, openProfileMenu, closeProfileMenu },
    { isCartMenuOpen, isProfileMenuOpen },
  ] = useMenuHandler();

  useOutsideClick(ref, () => {
    closeMenu();
  });

  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      window.location.reload(false);
    }
  };

  return (
    <div className="nav-ul_box-mobile" ref={ref}>
      <ul className="nav-ul_mobile">
        <li>
          <NavLink
            to="/memberships"
            data-item={t("menu.soci-menu")}
            onClick={closeMenu}
          >
            {t("menu.soci-menu")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/activitats" data-item="AGENDA" onClick={closeMenu}>
            AGENDA
          </NavLink>
        </li>
        {/* <li>
            <NavLink to="/botiga" data-item={t("menu.botiga")} onClick={closeMenu}>
              {t("menu.botiga")}
            </NavLink>
          </li> */}
        <li>
          <NavLink
            to="/support"
            data-item="#SUPPORTYOURLOCALS"
            onClick={closeMenu}
          >
            #SUPPORTYOURLOCALS
          </NavLink>
        </li>
        {/* <li>
            <NavLink to="/booking" data-item="BOOKING" onClick={closeMenu}>
              BOOKING
            </NavLink>
          </li> */}
        {localStorage.getItem("dev") === "true" ? (
          <li>
            <NavLink to="/socis" data-item="SOCI@S" onClick={closeMenu}>
              SOCI@S
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink
            to="/projects"
            data-item={t("menu.projectes")}
            onClick={closeMenu}
          >
            {t("menu.projectes")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" data-item="GALERIA" onClick={closeMenu}>
            GALERIA
          </NavLink>
        </li>
        <div className="liMenuOptions logname-li-mobile">
          {!isLoggedIn ? (
            <NavLink to="/login" data-item="LOGIN" onClick={closeMenu}>
              LOGIN
            </NavLink>
          ) : (
            <MenuLog
              isMobile
              closeMenu={closeMenu}
              isProfileMenuOpen={isProfileMenuOpen}
              openProfileMenu={openProfileMenu}
              closeProfileMenu={closeProfileMenu}
            />
          )}
        </div>
        <div className="menu-lang">
          <li>
            <a
              onClick={() => {
                handleChangeLanguage("ca");
                closeMenu;
              }}
              data-item="CAT"
              className={currentLang === "ca" ? "active" : ""}
            >
              CAT
            </a>
            <a
              onClick={() => {
                handleChangeLanguage("es");
                closeMenu;
              }}
              data-item="/CAST"
              className={currentLang === "es" ? "active" : ""}
            >
              /CAST
            </a>
          </li>
        </div>
        <Cart
          isMobile={true}
          closeMenu={closeMenu}
          openCartMenu={openCartMenu}
          closeCartMenu={closeCartMenu}
          isCartMenuOpen={isCartMenuOpen}
        />
      </ul>
    </div>
  );
}
