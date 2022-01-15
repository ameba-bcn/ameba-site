import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import Cart from "./Cart";

export default function NavbarButtons(props) {
  const { isLoggedIn = false, handleClick = {}, click } = props;
  const [t, i18next] = useTranslation("translation");

  const handleChangeLanguage = (lang) => {
    const currentLang = localStorage.getItem("i18nextLng");
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
          <NavLink to="/activitats" data-item="AGENDA">
            AGENDA
          </NavLink>
        </li>
        <li>
          <NavLink to="/botiga" data-item={t("menu.botiga")}>
            {t("menu.botiga")}
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
            <a onClick={() => handleChangeLanguage("ca")} data-item="CAT/">
              CAT/
            </a>
            <a onClick={() => handleChangeLanguage("es")} data-item="CAST">
              CAST
            </a>
          </li>
        </div>
        <Cart onClick={handleClick} click={click} />
      </ul>
    </div>
  );
}
