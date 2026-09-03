import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartMobile from "./CartMobile";
import AmebaLogo from "../ui/logo/AmebaLogo";
import Icon from "../ui/Icon";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import { isEmptyObject, isDateExpired } from "../../utils/utils";
import { NAV_SECTIONS, isSectionActive } from "./navSections";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";

// Sub-links shown when the Associació/Festivals rows expand — the rest of
// NAV_SECTIONS (Lab, Shop) has nowhere further to drill into, so those stay
// plain links.
const ASSOCIACIO_SUBLINKS = [
  { to: "/associacio", labelKey: "menu.submenu-associacio-qui-som" },
  { to: "/associacio/socis", labelKey: "menu.submenu-associacio-socis" },
  { to: "/associacio/nou-soci", labelKey: "menu.submenu-associacio-fes-te-soci" },
];
const FESTIVALS_SUBLINKS = [
  { to: "/festivals", labelKey: "menu.submenu-festivals-propers" },
  { to: "/festivals/arxiu", labelKey: "menu.submenu-festivals-arxiu" },
];

export default function NavbarButtonsMobile(props) {
  const { isLoggedIn = false, toggleRef, isOpen = false } = props;
  const [t, i18next] = useTranslation("translation");
  const location = useLocation();
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
  const initials =
    (fullName || user_data.username || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "?";

  const currentLang = localStorage.getItem("i18nextLng");
  const handleChangeLanguage = (lang) => {
    if (currentLang !== lang) {
      i18next.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      window.location.reload(false);
    }
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  // Single-open accordion, defaulting to whichever section (if any) the
  // current route already sits under.
  const [openSection, setOpenSection] = useState(() => {
    const active = NAV_SECTIONS.find(
      (item) =>
        ["associacio", "festivals"].includes(item.key) &&
        isSectionActive(item, location),
    );
    return active?.key ?? null;
  });
  const toggleSection = (key) =>
    setOpenSection((current) => (current === key ? null : key));

  const drawerRef = useRef(null);
  const timelineRef = useRef(null);

  useGsapContext(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (prefersReducedMotion()) {
      gsap.set(drawer, { autoAlpha: 0 });
      timelineRef.current = gsap.timeline({ paused: true }).to(drawer, { autoAlpha: 1, duration: 0.2 });
      return;
    }

    gsap.set(drawer, { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 });
    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(drawer, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "expo.out" });
  }, [], drawerRef);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) tl.play();
    else tl.reverse();
  }, [isOpen]);

  // Full-screen takeover: lock page scroll, close on Escape, return focus
  // to the burger button that opened it.
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      toggleRef?.current?.focus();
    };
  }, [isOpen, closeMenu, toggleRef]);

  // No role="dialog"/aria-modal here: like the panel it replaces, this
  // stays mounted at all times (clip-path drives the open/close visual so
  // the GSAP reveal has something to animate) rather than being
  // mounted/unmounted with `isOpen` — asserting modal semantics on a node
  // that's still in the tree (and tabbable) while "closed" would be
  // misleading to assistive tech, not more accessible.
  return (
    <div className="nb-drawer" ref={drawerRef}>
      <div className="nb-drawer__header">
        <NavLink to="/" className="nb-drawer__brand" onClick={closeMenu}>
          <AmebaLogo width={24} height={24} fill="var(--color-cream)" />
          AMEBA
        </NavLink>
        <button
          type="button"
          className="nb-icon"
          aria-label={t("menu.tanca-el-menu")}
          onClick={closeMenu}
        >
          <span className="nb-drawer__close" aria-hidden="true">×</span>
        </button>
      </div>

      {isLoggedIn && (
        <div className="nb-identity">
          <span className="nb-identity__avatar" aria-hidden="true">{initials}</span>
          <span className="nb-identity__meta">
            <span className="nb-identity__name">{fullName || user_data.username}</span>
            {isMember && (
              <span className="nb-identity__sub">
                {t("form.soci")} {user_member_data.number}
                {validYear && ` · ${t("compte.valid-fins")} ${validYear}`}
              </span>
            )}
          </span>
        </div>
      )}

      <span className="nb-glabel">{t("menu.seccions")}</span>
      <nav aria-label={t("menu.seccions")}>
        <button
          type="button"
          className="nb-row"
          aria-expanded={openSection === "associacio"}
          onClick={() => toggleSection("associacio")}
        >
          <span className="nb-msq" style={{ background: "var(--section-associacio)" }} aria-hidden="true" />
          {t("menu.associacio")}
          <span className="nb-chev" aria-hidden="true">▼</span>
        </button>
        {openSection === "associacio" && (
          <div className="nb-sub">
            {ASSOCIACIO_SUBLINKS.map(({ to, labelKey }) => (
              <NavLink key={to} to={to} onClick={closeMenu}>
                {t(labelKey)}
              </NavLink>
            ))}
          </div>
        )}

        <button
          type="button"
          className="nb-row"
          style={{ color: "var(--color-amarillo)" }}
          aria-expanded={openSection === "festivals"}
          onClick={() => toggleSection("festivals")}
        >
          <span className="nb-msq" style={{ background: "var(--section-festivals)" }} aria-hidden="true" />
          {t("menu.festivals")}
          <span className="nb-chev" aria-hidden="true">▼</span>
        </button>
        {openSection === "festivals" && (
          <div className="nb-sub">
            {FESTIVALS_SUBLINKS.map(({ to, labelKey }) => (
              <NavLink key={to} to={to} onClick={closeMenu}>
                {t(labelKey)}
              </NavLink>
            ))}
          </div>
        )}

        <NavLink
          to="/lab"
          className="nb-row"
          style={{ color: "var(--color-naranja)" }}
          onClick={closeMenu}
        >
          <span className="nb-msq" style={{ background: "var(--section-lab)" }} aria-hidden="true" />
          {t("menu.lab")}
          <span className="nb-arrow" aria-hidden="true">→</span>
        </NavLink>
        <NavLink
          to="/botiga"
          className="nb-row"
          style={{ color: "var(--color-rojo)" }}
          onClick={closeMenu}
        >
          <span className="nb-msq" style={{ background: "var(--section-shop)" }} aria-hidden="true" />
          {t("menu.shop")}
          <span className="nb-arrow" aria-hidden="true">→</span>
        </NavLink>
      </nav>

      {isLoggedIn && (
        <>
          <span className="nb-glabel">{t("compte.eyebrow")}</span>
          <div>
            <NavLink className="nb-arow" to="/compte/dades" onClick={closeMenu}>
              {t("compte.dades-personals")}
              <span className="nb-arrow" aria-hidden="true">→</span>
            </NavLink>
            {isMember && (
              <NavLink className="nb-arow" to="/compte/projecte" onClick={closeMenu}>
                {t("menu.el-meu-projecte")}
                <span className="nb-arrow" aria-hidden="true">→</span>
              </NavLink>
            )}
            <button type="button" className="nb-arow" style={{ color: "var(--color-rojo)" }} onClick={handleLogout}>
              {t("compte.logout")}
            </button>
          </div>
        </>
      )}

      {hasCartItems && (
        <>
          <span className="nb-glabel">{t("menu.la-meva-cistella")}</span>
          <CartMobile />
        </>
      )}

      {!isLoggedIn && (
        <div className="nb-drawer__cta">
          <NavLink to="/associacio/nou-soci" className="nb-badge nb-badge--naranja" onClick={closeMenu}>
            {t("home.hero.cta-soci")}
          </NavLink>
          <NavLink to="/login" className="nb-badge nb-badge--outline" onClick={closeMenu}>
            {t("home.hero.cta-acces")}
          </NavLink>
        </div>
      )}

      <div className="nb-drawer__footer">
        <span className="nb-drawer__footer-label">
          <Icon icon="language" type="hoverable-black" width="16" height="16" />
          {t("menu.idioma")}
        </span>
        <div className="nb-seg" role="group" aria-label={t("menu.idioma")}>
          <button type="button" aria-pressed={currentLang !== "es"} onClick={() => handleChangeLanguage("ca")}>
            CAT
          </button>
          <button type="button" aria-pressed={currentLang === "es"} onClick={() => handleChangeLanguage("es")}>
            CAST
          </button>
        </div>
      </div>
    </div>
  );
}
