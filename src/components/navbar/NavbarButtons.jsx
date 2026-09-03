import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import Cart from "./Cart";
import Icon from "../ui/Icon";
import AmebaBlob from "../ui/logo/AmebaBlob";
import { NAV_SECTIONS, isSectionActive } from "./navSections";

export default function NavbarButtons(props) {
  const { isLoggedIn = false } = props;
  const [t, i18next] = useTranslation("translation");
  const location = useLocation();
  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      window.location.reload(false);
    }
  };
  const nextLang = currentLang === "es" ? "ca" : "es";

  return (
    <div className="menuButtons">
      <ul className="nav-ul">
        {NAV_SECTIONS.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.to}
              className={() =>
                `nav-section-link${
                  isSectionActive(item, location) ? " active" : ""
                }`
              }
              style={{ "--chip-color": `var(${item.chip})` }}
            >
              <span className="nav-color-chip" aria-hidden="true" />
              {t(`menu.${item.key}`)}
            </NavLink>
          </li>
        ))}

        <div className="nav-icons">
          <div className="liMenuOptions logname-li">
            {!isLoggedIn ? (
              <NavLink
                to="/inicia-sessio"
                className="nav-icon-link"
                aria-label="Login"
              >
                <AmebaBlob
                  color="cream"
                  size={30}
                  className="nav-user-blob"
                />
              </NavLink>
            ) : (
              <MenuLog />
            )}
          </div>
          <Cart />
          <button
            className="nav-lang-toggle"
            onClick={() => handleChangeLanguage(nextLang)}
            aria-label={t("menu.idioma")}
          >
            <Icon
              icon="language"
              type="hoverable-black"
              width="24"
              height="24"
            />
            <span>{currentLang === "es" ? "CAST" : "CAT"}</span>
          </button>
        </div>
      </ul>
    </div>
  );
}
