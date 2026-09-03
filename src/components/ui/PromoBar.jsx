import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { safeSessionStorage } from "../../utils/safeStorage";
import { gsap, DESKTOP_QUERY, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./PromoBar.css";

const STORAGE_KEY = "promoBarClosed";

/**
 * Banda promocional bajo la navbar — soci/sòcia d'Ameba → /associacio/nou-soci.
 * Compartida entre Home (closable, con botón de cierre persistido en
 * sessionStorage — antes era el componente aparte PromoBanner) y las 4
 * vistas de sección (PageLayout `promo` prop, sin cerrar).
 */
export default function PromoBar({ closable = false }) {
  const [t] = useTranslation("translation");
  const [closed, setClosed] = useState(
    closable && safeSessionStorage.getItem(STORAGE_KEY) === "1",
  );
  const rootRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowLoop = useRef(null);

  useGsapContext(() => {
    if (closed) return;

    if (prefersReducedMotion()) {
      gsap.set(rootRef.current, { autoAlpha: 0 });
      gsap.to(rootRef.current, { autoAlpha: 1, duration: 0.2 });
      return;
    }

    gsap.set(rootRef.current, { height: 0, autoAlpha: 0 });
    gsap.to(rootRef.current, { height: "auto", autoAlpha: 1, duration: 0.4 });

    // Arrow/cta hover loop, desktop only.
    gsap.matchMedia().add(DESKTOP_QUERY, () => {
      const cta = ctaRef.current;
      if (!cta) return undefined;
      const enter = () => {
        arrowLoop.current = gsap.to(cta, { x: 6, duration: 0.8, yoyo: true, repeat: -1 });
      };
      const leave = () => {
        arrowLoop.current?.kill();
        gsap.to(cta, { x: 0, duration: 0.2 });
      };
      cta.addEventListener("mouseenter", enter);
      cta.addEventListener("mouseleave", leave);
      return () => {
        cta.removeEventListener("mouseenter", enter);
        cta.removeEventListener("mouseleave", leave);
      };
    });
  }, [closed], rootRef);

  if (closed) return null;

  const handleClose = () => {
    safeSessionStorage.setItem(STORAGE_KEY, "1");
    if (prefersReducedMotion()) {
      setClosed(true);
      return;
    }
    gsap.to(rootRef.current, {
      height: 0,
      autoAlpha: 0,
      duration: 0.35,
      onComplete: () => setClosed(true),
    });
  };

  return (
    <div className="promo-bar" ref={rootRef}>
      <Link to="/associacio/nou-soci" className="promo-bar__link">
        <span className="promo-bar__text promo-bar__text--desktop">
          {t("banners.promo-text-1")}
          <strong>{t("banners.promo-text-bold")}</strong>
          {t("banners.promo-text-2")}
        </span>
        <span className="promo-bar__cta promo-bar__cta--desktop" ref={ctaRef}>
          {t("banners.promo-cta")}
        </span>
        <span className="promo-bar__text promo-bar__text--mobile">
          {t("banners.promo-text-mobile")}
        </span>
      </Link>
      {closable && (
        <button
          type="button"
          className="promo-bar__close"
          onClick={handleClose}
          aria-label={t("banners.promo-close")}
        >
          ×
        </button>
      )}
    </div>
  );
}
