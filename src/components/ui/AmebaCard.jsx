import React from "react";
import { NavLink } from "react-router-dom";
import AmebaCardTitle from "./AmebaCardTitle";
import "./AmebaCard.css";

export default function AmebaCard({
  to,
  image,
  imageAlt,
  badge,
  title,
  subtitle,
  highlight,
  meta,
  aspect = "1/1",
  imageFit = "cover",
}) {
  return (
    <NavLink to={to} className="ameba-card">
      <div className="ameba-card__media" style={{ aspectRatio: aspect }}>
        {badge && <span className="ameba-card__badge">{badge}</span>}
        <img
          className="ameba-card__image"
          style={{ objectFit: imageFit }}
          src={image}
          alt={imageAlt || ""}
        />
      </div>
      <div className="ameba-card__title-block">
        <AmebaCardTitle
          padding="16px 16px 0"
          color="var(--color-cream)"
          fontStyle="normal"
        >
          {title}
        </AmebaCardTitle>
        {subtitle && <div className="ameba-card__subtitle">{subtitle}</div>}
      </div>
      {highlight && <div className="ameba-card__highlight">{highlight}</div>}
      {meta && <div className="ameba-card__meta">{meta}</div>}
    </NavLink>
  );
}
