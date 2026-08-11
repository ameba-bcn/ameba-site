import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import CartMobile from "./CartMobile";
import Icon from "../ui/Icon";
import useOutsideClick from "../../hooks/use-outside-click";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";
import { NAV_SECTIONS, isSectionActive } from "./navSections";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, refer, toggleRef, isOpen = false } = props;
  const [t, i18next] = useTranslation("translation");
  const location = useLocation();
  const closeMenu = useUIStore((state) => state.closeMenu);
  const { cart_data = {} } = useCartStore();
  const hasCartItems = (cart_data?.item_variants || []).length > 0;
  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      window.location.reload(false);
    }
  };
  const nextLang = currentLang === "es" ? "ca" : "es";

  useOutsideClick(refer, (e) => {
    if (isOpen && !toggleRef?.current?.contains(e.target)) closeMenu();
  });

  return (
    <div
      className={`nav-ul_box-mobile${isOpen ? " nav-ul_box-mobile--open" : ""}${hasCartItems ? " nav-ul_box-mobile--has-cart" : ""}`}
    >
      <ul className="nav-ul_mobile" ref={refer}>
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
              onClick={() => closeMenu()}
            >
              <span className="nav-color-chip" aria-hidden="true" />
              {t(`menu.${item.key}`)}
            </NavLink>
          </li>
        ))}

        <div className="nav-icons nav-icons--mobile">
          <div className="liMenuOptions logname-li-mobile">
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="nav-icon-link"
                aria-label="Login"
                onClick={() => closeMenu()}
              >
                <Icon
                  icon="user"
                  type="hoverable-black"
                  width="30"
                  height="30"
                />
              </NavLink>
            ) : (
              <MenuLog isMobile={true} />
            )}
          </div>
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
        <CartMobile />
      </ul>
    </div>
  );
}
