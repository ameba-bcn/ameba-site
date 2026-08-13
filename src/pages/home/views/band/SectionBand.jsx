import React from "react";
import { Link } from "react-router-dom";
import "./SectionBand.css";

/**
 * Banda de sección de la home (rediseño 2026).
 * Megatítulo outline de fondo + imagen duotono + lead/body + botón (+).
 * `to` opcional: sin destino no se renderiza el (+).
 */
export default function SectionBand({
  id,
  color,
  title,
  image,
  lead,
  body,
  to,
  reverse = false,
}) {
  return (
    <section
      className={`section-band${reverse ? " section-band--reverse" : ""}`}
      id={id}
      style={{ "--band-color": color }}
    >
      <span className="section-band__megatitle" aria-hidden="true">
        {title}
      </span>
      <div className="section-band__content">
        {image && (
          <div className="section-band__media">
            <img
              src={image}
              alt=""
              className="section-band__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <div className="section-band__detail">
          <h2 className="section-band__title">{title}</h2>
          <p className="section-band__lead">{lead}</p>
          {body && <p className="section-band__body">{body}</p>}
          {to && (
            <Link className="section-band__more" to={to} aria-label={title}>
              +
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
