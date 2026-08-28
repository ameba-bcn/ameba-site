import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./PromoBar.css";

export default function PromoBar() {
  const [t] = useTranslation("translation");

  return (
    <Link to="/memberships" className="promo-bar">
      <span className="promo-bar__text">
        {t("banners.promo-text-1")}
        <strong>{t("banners.promo-text-bold")}</strong>
        {t("banners.promo-text-2")}
      </span>
      <span className="promo-bar__cta">{t("banners.promo-cta")}</span>
    </Link>
  );
}
