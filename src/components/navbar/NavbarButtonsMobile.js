import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import CartMobile from "./CartMobile";
import { setCloseMenu } from "../../store/actions/menu";
import useOutsideClick from "../../hooks/use-outside-click";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, refer } = props;
  const [t, i18next] = useTranslation("translation");
  const dispatch = useDispatch();
  const currentLang = localStorage.getItem("i18nextLng");
  const [rendered, setRendered] = useState(false);
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      window.location.reload(false);
    }
  };

  useEffect(() => {
    setRendered(true);
  }, []);

  useOutsideClick(refer, () => {
    if (rendered) dispatch(setCloseMenu());
  });

  return (
    <div className="nav-ul_box-mobile">
      <ul className="nav-ul_mobile" ref={refer}>
        <li>
          <NavLink
            to="/memberships"
            data-item={t("menu.soci-menu")}
            onClick={() => dispatch(setCloseMenu())}
          >
            {t("menu.soci-menu")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/activitats"
            data-item="AGENDA"
            onClick={() => dispatch(setCloseMenu())}
          >
            AGENDA
          </NavLink>
        </li>
        {/* <li>
            <NavLink to="/botiga" data-item={t("menu.botiga")} onClick={() => dispatch(setCloseMenu())}>
              {t("menu.botiga")}
            </NavLink>
          </li> */}
        <li>
          <NavLink
            to="/support"
            data-item="#SUPPORTYOURLOCALS"
            onClick={() => dispatch(setCloseMenu())}
          >
            #SUPPORTYOURLOCALS
          </NavLink>
        </li>
        {/* <li>
            <NavLink to="/booking" data-item="BOOKING" onClick={() => dispatch(setCloseMenu())}>
              BOOKING
            </NavLink>
          </li> */}
        <li>
          <NavLink
            to="/socis"
            data-item="SOCI@S"
            onClick={() => dispatch(setCloseMenu())}
          >
            SOCI@S
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            data-item={t("menu.projectes")}
            onClick={() => dispatch(setCloseMenu())}
          >
            {t("menu.projectes")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            data-item="GALERIA"
            onClick={() => dispatch(setCloseMenu())}
          >
            GALERIA
          </NavLink>
        </li>
        <div className="liMenuOptions logname-li-mobile">
          {!isLoggedIn ? (
            <NavLink
              to="/login"
              data-item="LOGIN"
              onClick={() => dispatch(setCloseMenu())}
            >
              LOGIN
            </NavLink>
          ) : (
            <MenuLog isMobile={true} />
          )}
        </div>
        <div className="menu-lang">
          <li>
            <a
              onClick={() => {
                handleChangeLanguage("ca");
              }}
              data-item="CAT"
              className={currentLang === "ca" ? "active" : ""}
            >
              CAT
            </a>
            <a
              onClick={() => {
                handleChangeLanguage("es");
              }}
              data-item="/CAST"
              className={currentLang === "es" ? "active" : ""}
            >
              /CAST
            </a>
          </li>
        </div>
        <CartMobile />
      </ul>
    </div>
  );
}
