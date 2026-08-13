import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { safeSessionStorage } from "../../utils/safeStorage";
import "./PromoBanner.css";

const STORAGE_KEY = "promoBannerClosed";

export default function PromoBanner() {
  const { pathname } = useLocation();
  const [t] = useTranslation("translation");
  const [closed, setClosed] = useState(
    safeSessionStorage.getItem(STORAGE_KEY) === "1",
  );

  if (pathname !== "/" || closed) return null;

  const handleClose = () => {
    safeSessionStorage.setItem(STORAGE_KEY, "1");
    setClosed(true);
  };

  return (
    <div className="promo-banner">
      <Link to="/memberships" className="promo-banner__link">
        <span className="promo-banner__text">
          {t("banners.promo-text-1")}
          <strong>{t("banners.promo-text-bold")}</strong>
          {t("banners.promo-text-2")}
        </span>
        <span className="promo-banner__cta">{t("banners.promo-cta")}</span>
      </Link>
      <button
        type="button"
        className="promo-banner__close"
        onClick={handleClose}
        aria-label={t("banners.promo-close")}
      >
        ×
      </button>
    </div>
  );
}
