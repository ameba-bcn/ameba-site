import React, { useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartMobile from "./CartMobile";
import Icon from "../ui/Icon";
import Button from "../button/Button";
import AmebaBlob from "../ui/logo/AmebaBlob";
import useOutsideClick from "../../hooks/use-outside-click";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import { isEmptyObject, isDateExpired } from "../../utils/utils";
import { NAV_SECTIONS, isSectionActive } from "./navSections";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, refer, toggleRef, isOpen = false } = props;
  const [t, i18next] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();
  const closeMenu = useUIStore((state) => state.closeMenu);
  const { cart_data = {} } = useCartStore();
  const hasCartItems = (cart_data?.item_variants || []).length > 0;
  const { user_data = {}, user_member_data = {} } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const isMember =
    !isEmptyObject(user_member_data) && !isDateExpired(user_member_data.expires);
  const fullName = [user_member_data.first_name, user_member_data.last_name]
    .filter(Boolean)
    .join(" ");
  const validYear = user_member_data.expires
    ? new Date(user_member_data.expires).getFullYear()
    : null;
  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      window.location.reload(false);
    }
  };
  const nextLang = currentLang === "es" ? "ca" : "es";

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  useOutsideClick(refer, (e) => {
    if (isOpen && !toggleRef?.current?.contains(e.target)) closeMenu();
  });

  const boxRef = useRef(null);
  const timelineRef = useRef(null);

  // 1.4 — one reversible timeline (paused, built once), not a second
  // timeline for closing: `.reverse()` on close.
  useGsapContext(() => {
    const box = boxRef.current;
    if (!box) return;
    const items = gsap.utils.toArray("li", box);
    const links = items.map((li) => li.querySelector("a"));
    const chips = items.map((li) => li.querySelector(".nav-color-chip"));
    const ctaButtons = gsap.utils.toArray(".nav-drawer-cta .boton", box);

    if (prefersReducedMotion()) {
      gsap.set(box, { autoAlpha: 0 });
      timelineRef.current = gsap.timeline({ paused: true }).to(box, { autoAlpha: 1, duration: 0.2 });
      return;
    }

    gsap.set(box, { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 });
    gsap.set(items, { overflow: "hidden" });
    gsap.set(links, { yPercent: 100 });
    gsap.set(chips, { scaleY: 0, transformOrigin: "center bottom" });
    gsap.set(ctaButtons, { y: 20, autoAlpha: 0 });

    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(box, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "expo.out" })
      .to(links, { yPercent: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.25")
      .to(chips, { scaleY: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "<")
      .to(ctaButtons, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 });
  }, [], boxRef);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) tl.play();
    else tl.reverse();
  }, [isOpen]);

  return (
    <div
      className={`nav-ul_box-mobile${isOpen ? " nav-ul_box-mobile--open" : ""}${hasCartItems ? " nav-ul_box-mobile--has-cart" : ""}`}
      ref={boxRef}
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
            {!isLoggedIn && (
              <NavLink
                to="/login"
                className="nav-icon-link"
                aria-label="Login"
                onClick={() => closeMenu()}
              >
                <AmebaBlob
                  color="cream"
                  size={30}
                  className="nav-user-blob"
                />
              </NavLink>
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

        {isLoggedIn && (
          <div className="nav-account-box">
            <span className="nav-account-box__name">
              {fullName || user_data.username}
            </span>
            {isMember && (
              <span className="nav-account-box__meta">
                {t("form.soci")} {user_member_data.number}
                {validYear && ` · ${t("compte.valid-fins")} ${validYear}`}
              </span>
            )}
            <div className="nav-account-box__links">
              <NavLink to="/compte/dades" onClick={() => closeMenu()}>
                {t("compte.eyebrow")}
              </NavLink>
              {isMember && (
                <NavLink to="/compte/projecte" onClick={() => closeMenu()}>
                  {t("menu.el-meu-projecte")}
                </NavLink>
              )}
              <button type="button" className="nav-account-box__logout" onClick={handleLogout}>
                {t("compte.logout")}
              </button>
            </div>
          </div>
        )}

        <CartMobile />

        <div className="nav-drawer-cta">
          <Button
            buttonStyle="boton--orange--solid"
            buttonSize="boton--big"
            className="nav-drawer-cta__button"
            onClick={() => {
              closeMenu();
              navigate("/memberships");
            }}
          >
            {t("home.hero.cta-soci")}
          </Button>
          <Button
            buttonStyle="boton--primary--solid"
            buttonSize="boton--big"
            className="nav-drawer-cta__button"
            onClick={() => {
              closeMenu();
              navigate(isLoggedIn ? "/compte" : "/login");
            }}
          >
            {t("home.hero.cta-acces")}
          </Button>
        </div>
      </ul>
    </div>
  );
}
