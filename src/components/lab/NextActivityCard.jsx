import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice, priceMayDiscount, formatISODateToDate, formatDateToHour } from "../../utils/utils";
import "./NextActivityCard.css";

export default function NextActivityCard({ activity }) {
  const [t] = useTranslation("translation");

  if (!activity) {
    return <div className="next-activity-card__empty">{t("lab.cap-activitat-propera")}</div>;
  }

  const { id, name, header, images, price = 0, discount, address, datetime } = activity;

  return (
    <NavLink to={`/activitats/${id}`} className="next-activity-card">
      <img className="next-activity-card__image" src={images?.[0]} alt={header || name} />
      <div className="next-activity-card__panel">
        <div className="next-activity-card__date">
          {formatISODateToDate(datetime)} - {formatDateToHour(datetime)}H
        </div>
        <div className="next-activity-card__title">{header || name}</div>
        <div className="next-activity-card__row">
          {price === 0
            ? t("events.button.gratis").toUpperCase()
            : priceMayDiscount(formatPrice(price), discount, null, t("form.descompte"))}
        </div>
        {address && <div className="next-activity-card__row">{address}</div>}
      </div>
    </NavLink>
  );
}
