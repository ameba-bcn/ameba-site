import React from "react";
import { Link } from "react-router-dom";
import AmebaDots from "../../../../components/layout/AmebaDots";
import AmebaBlob from "../../../../components/ui/logo/AmebaBlob";
import MegaTitle from "../../../../components/ui/MegaTitle";
import plusIcon from "../../../../assets/images/general/plus-icon.png";
import "./SectionBand.css";

/**
 * Banda de sección de la home (rediseño 2026).
 * Megatítulo outline a todo el ancho (por encima de la imagen, por debajo
 * del texto) + imagen duotono + lead/body + botón (+).
 * `to` opcional: sin destino no se renderiza el (+).
 * `morePosition` opcional: {left, right, top} (valores CSS) para colocar
 * el (+) en un sitio distinto en cada sección.
 * `dotsPosition` opcional: "image" (bottom-left de la imagen, default),
 * "image-top-right" (fila horizontal sobre la esquina superior derecha
 * de la imagen), "top-right" (esquina superior derecha de la sección)
 * o "bottom-left" (esquina inferior izquierda de la sección).
 */
export default function SectionBand({
  id,
  color,
  title,
  image,
  lead,
  body,
  to,
  morePosition = {},
  dotsPosition = "image",
  reverse = false,
}) {
  return (
    <section
      className={`section-band${reverse ? " section-band--reverse" : ""}`}
      id={id}
      style={{ "--band-color": color }}
    >
      <MegaTitle as="h2" title={title} className="section-band__megatitle" />
      <div className="section-band__content">
        {image && (
          <div className="section-band__media">
            {dotsPosition.startsWith("image") && (
              <div
                className={`section-band__dots${
                  dotsPosition === "image-top-right"
                    ? " section-band__dots--image-top-right"
                    : ""
                }`}
              >
                <AmebaDots />
              </div>
            )}
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
        </div>
      </div>
      {(dotsPosition === "top-right" || dotsPosition === "bottom-left") && (
        <div
          className={`section-band__dots section-band__dots--${dotsPosition}`}
        >
          <AmebaDots />
        </div>
      )}
      <div className="section-band__rule" aria-hidden="true" />
      {to && (
        <Link
          className="section-band__more"
          to={to}
          aria-label={title}
          style={{
            "--more-left": morePosition.left,
            "--more-right": morePosition.right,
            "--more-top": morePosition.top,
          }}
        >
          <AmebaBlob
            color="black"
            className="section-band__more-blob section-band__more-blob--base"
          />
          {/* Ameba superior del color de la banda: camuflada con el fondo,
              al girar deja asomar la negra como medialunas */}
          <AmebaBlob
            color="var(--band-color)"
            className="section-band__more-blob section-band__more-blob--spin"
          />
          <img src={plusIcon} alt="" width="104" height="104" />
        </Link>
      )}
    </section>
  );
}
