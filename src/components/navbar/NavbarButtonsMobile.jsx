import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLog from "./MenuLog";
import CartMobile from "./CartMobile";
import useOutsideClick from "../../hooks/use-outside-click";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, refer, toggleRef, isOpen = false } = props;
  const [t, i18next] = useTranslation("translation");
  const closeMenu = useUIStore((state) => state.closeMenu);
  const { cart_data = {} } = useCartStore();
  const hasCartItems = (cart_data?.item_variants || []).length > 0;
  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      window.location.reload(false);
    }
  };

  useOutsideClick(refer, (e) => {
    if (isOpen && !toggleRef?.current?.contains(e.target)) closeMenu();
  });

  return (
    <div
      className={`nav-ul_box-mobile${isOpen ? " nav-ul_box-mobile--open" : ""}${hasCartItems ? " nav-ul_box-mobile--has-cart" : ""}`}
    >
      <ul className="nav-ul_mobile" ref={refer}>
        <li>
          <NavLink
            to="/memberships"
            data-item={t("menu.soci-menu")}
            onClick={() => closeMenu()}
          >
            {t("menu.soci-menu")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/activitats"
            data-item="AGENDA"
            onClick={() => closeMenu()}
          >
            AGENDA
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/botiga"
            data-item={t("menu.botiga")}
            onClick={() => closeMenu()}
          >
            {t("menu.botiga")}
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/support"
            data-item="#SUPPORTYOURLOCALS"
            onClick={() => closeMenu()}
          >
            #SUPPORTYOURLOCALS
          </NavLink>
        </li> */}
        {/* <li>
            <NavLink to="/booking" data-item="BOOKING" onClick={() => closeMenu()}>
              BOOKING
            </NavLink>
          </li> */}
        <li>
          <NavLink to="/socis" data-item="SOCI@S" onClick={() => closeMenu()}>
            SOCI@S
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            data-item={t("menu.arxiu")}
            onClick={() => closeMenu()}
          >
            {t("menu.arxiu")}
          </NavLink>
        </li>
        <div className="liMenuOptions logname-li-mobile">
          {!isLoggedIn ? (
            <NavLink to="/login" data-item="LOGIN" onClick={() => closeMenu()}>
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
