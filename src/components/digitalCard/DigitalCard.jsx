import React from "react";
import "./DigitalCard.css";

export default function DigitalCard({ badge, title, subtitle, rows = [] }) {
  return (
    <div className="digital-card">
      <div className="digital-card__header">
        <p className="digital-card__brand">AMEBA</p>
        {badge && <span className="digital-card__badge">{badge}</span>}
      </div>

      <div className="digital-card__info">
        <h2 className="digital-card__title">{title}</h2>
        {subtitle && <p className="digital-card__subtitle">{subtitle}</p>}
      </div>

      {rows.length > 0 && (
        <div className="digital-card__footer">
          {rows.map((row) => (
            <div className="digital-card__footer-item" key={row.label}>
              <span className="digital-card__footer-label">{row.label}</span>
              <span className="digital-card__footer-value">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
