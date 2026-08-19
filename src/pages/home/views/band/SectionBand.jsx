import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AmebaDots from "../../../../components/layout/AmebaDots";
import AmebaBlob from "../../../../components/ui/logo/AmebaBlob";
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
  const megatitleRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Encoge el megatítulo (escala uniforme, sin deformar) si no cabe
  // en el ancho de la sección; si cabe, se queda a tamaño natural
  useLayoutEffect(() => {
    const wrap = megatitleRef.current;
    const text = textRef.current;
    if (!wrap || !text) return undefined;

    const fit = () => {
      const styles = window.getComputedStyle(wrap);
      const available =
        wrap.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      const natural = text.offsetWidth;
      if (natural > 0 && available > 0)
        setScale(Math.min(1, available / natural));
    };

    fit();
    // Remedir cuando termina de cargar la webfont (Arimo)
    document.fonts?.ready?.then(fit);
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    observer.observe(text);
    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      className={`section-band${reverse ? " section-band--reverse" : ""}`}
      id={id}
      style={{ "--band-color": color }}
    >
      <h2 className="section-band__megatitle" ref={megatitleRef}>
        <span
          className="section-band__megatitle-text"
          ref={textRef}
          style={{ transform: `scale(${scale})` }}
        >
          {title}
        </span>
      </h2>
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
