import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { safeSessionStorage } from "../../utils/safeStorage";
import "./PromoBar.css";

const STORAGE_KEY = "promoBarClosed";

/**
 * Banda promocional bajo la navbar — soci/sòcia d'Ameba → /memberships.
 * Compartida entre Home (closable, con botón de cierre persistido en
 * sessionStorage — antes era el componente aparte PromoBanner) y las 4
 * vistas de sección (PageLayout `promo` prop, sin cerrar).
 */
export default function PromoBar({ closable = false }) {
  const [t] = useTranslation("translation");
  const [closed, setClosed] = useState(
    closable && safeSessionStorage.getItem(STORAGE_KEY) === "1",
  );

  if (closed) return null;

  const handleClose = () => {
    safeSessionStorage.setItem(STORAGE_KEY, "1");
    setClosed(true);
  };

  return (
    <div className="promo-bar">
      <Link to="/memberships" className="promo-bar__link">
        <span className="promo-bar__text">
          {t("banners.promo-text-1")}
          <strong>{t("banners.promo-text-bold")}</strong>
          {t("banners.promo-text-2")}
        </span>
        <span className="promo-bar__cta">{t("banners.promo-cta")}</span>
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
