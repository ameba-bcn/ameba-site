import React from "react";
import { NavLink } from "react-router-dom";
import MenuLog from "./MenuLog";
import Cart from "./Cart";
import { useTranslation } from "react-i18next";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, click, handleClick, isMobile } = props;
  const [t, i18next] = useTranslation("translation");

  const handleChangeLanguage = (lang) => {
    const currentLang = localStorage.getItem("i18nextLng");
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      window.location.reload(false);
    }
  };

  return (
    <div className="nav-ul_box-mobile">
      {click && (
        <ul className="nav-ul_mobile">
          <li>
            <NavLink to="/memberships" data-item={t("menu.soci-menu")} onClick={handleClick}>
              {t("menu.soci-menu")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/activitats" data-item="AGENDA" onClick={handleClick}>
              AGENDA
            </NavLink>
          </li>
          <li>
            <NavLink to="/botiga" data-item={t("menu.botiga")} onClick={handleClick}>
              {t("menu.botiga")}
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
            <NavLink to="/booking" data-item="BOOKING" onClick={handleClick}>
              BOOKING
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" data-item="GALERIA" onClick={handleClick}>
              GALERIA
            </NavLink>
          </li>
          <div className="liMenuOptions logname-li-mobile">
            {!isLoggedIn ? (
              <NavLink to="/login" data-item="LOGIN" onClick={handleClick}>
                LOGIN
              </NavLink>
            ) : (
              <MenuLog isMobile handleClick={handleClick} />
            )}
          </div>
          <div className="menu-lang">
            <li>
              <a
                onClick={() => handleChangeLanguage("ca")}
                data-item="CAT/"
              >
                CAT/
              </a>
              <a
                onClick={() => handleChangeLanguage("es")}
                data-item="CAST"
              >
                CAST
              </a>
            </li>
          </div>
          <Cart isMobile={isMobile} onClick={handleClick} click={click} />
        </ul>
      )}
    </div>
  );
}
