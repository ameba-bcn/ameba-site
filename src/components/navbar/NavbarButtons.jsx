import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import Cart from "./Cart";

export default function NavbarButtons(props) {
  const { isLoggedIn = false } = props;
  const [t, i18next] = useTranslation("translation");
  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      window.location.reload(false);
    }
  };

  return (
    <div className="menuButtons">
      <ul className="nav-ul">
        <li>
          <NavLink to="/memberships" data-item={t("menu.soci-menu")}>
            {t("menu.soci-menu")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/activitats" data-item="AGENDA">
            AGENDA
          </NavLink>
        </li>
        <li>
          <NavLink to="/botiga" data-item={t("menu.botiga")}>
            {t("menu.botiga")}
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/support" data-item="#SUPPORTYOURLOCALS">
            #SUPPORTYOURLOCALS
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/booking" data-item="BOOKING">
            BOOKING
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/socis" data-item="SOCI@S">
            SOCI@S
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" data-item={t("menu.projectes")}>
            {t("menu.projectes")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" data-item="GALERIA">
            GALERIA
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
        <div className="menu-lang">
          <li>
            <a
              onClick={() => handleChangeLanguage("ca")}
              data-item="CAT/"
              className={currentLang === "ca" ? "active" : ""}
            >
              CAT/
            </a>
            <a
              onClick={() => handleChangeLanguage("es")}
              data-item="CAST"
              className={currentLang === "es" ? "active" : ""}
            >
              CAST
            </a>
          </li>
        </div>
        <Cart />
      </ul>
    </div>
  );
}
