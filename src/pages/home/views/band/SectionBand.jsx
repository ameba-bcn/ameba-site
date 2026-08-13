import React from "react";
import { Link } from "react-router-dom";
import AmebaDots from "../../../../components/layout/AmebaDots";
import "./SectionBand.css";

/**
 * Banda de sección de la home (rediseño 2026).
 * Megatítulo outline a todo el ancho (por encima de la imagen, por debajo
 * del texto) + imagen duotono + lead/body + botón (+).
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
      <h2 className="section-band__megatitle">{title}</h2>
      <div className="section-band__content">
        {image && (
          <div className="section-band__media">
            <div className="section-band__dots">
              <AmebaDots />
            </div>
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
