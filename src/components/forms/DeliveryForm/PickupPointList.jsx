import React from "react";
import { useTranslation } from "react-i18next";

export default function PickupPointList({ locations, value, onChange }) {
  const [t] = useTranslation("translation");

  return (
    <div className="pickup-list">
      {locations.map((location) => {
        const selected = value === location.value;
        const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${location.name} ${location.address}`,
        )}`;
        return (
          <label
            key={location.value}
            className={`pickup-row${selected ? " pickup-row--selected" : ""}`}
            htmlFor={`pickup-${location.value}`}
          >
            <input
              type="radio"
              id={`pickup-${location.value}`}
              name="pickup_location"
              value={location.value}
              checked={selected}
              onChange={() => onChange(location.value)}
              className="sr-only"
            />
            <span className="pickup-row__mark" aria-hidden="true" />
            <span className="pickup-row__body">
              <span className="pickup-row__head">
                <span className="pickup-row__name">{location.name}</span>
                <span className="pickup-row__tag">{location.tag}</span>
              </span>
              <span className="pickup-row__address">{location.address}</span>
            </span>
            <a
              className="pickup-row__map"
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("checkout.veure-mapa")} ↗
            </a>
          </label>
        );
      })}
    </div>
  );
}
