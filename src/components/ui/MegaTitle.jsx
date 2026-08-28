import React, { useLayoutEffect, useRef, useState } from "react";
import "./MegaTitle.css";

/**
 * Título gigante en outline (Arimo, trazo, relleno transparente) que se
 * encoge en escala uniforme (sin deformar) si no cabe en su contenedor —
 * la misma lógica que ya usaba SectionBand.jsx en Home, extraída aquí para
 * reutilizarla en cualquier sitio con este tratamiento (SectionHero, etc.).
 * Solo controla tipografía + fit; el llamante decide tamaño/posición vía
 * className (ver .section-band__megatitle / .section-hero__outline-title).
 */
export default function MegaTitle({
  title,
  as: Tag = "h1",
  className = "",
  fit = true,
  strokeColor,
}) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!fit) return undefined;
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return undefined;

    const measure = () => {
      const styles = window.getComputedStyle(wrap);
      const available =
        wrap.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      const natural = text.offsetWidth;
      if (natural > 0 && available > 0)
        setScale(Math.min(1, available / natural));
    };

    measure();
    // Remedir cuando termina de cargar la webfont (Arimo)
    document.fonts?.ready?.then(measure);
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(text);
    return () => observer.disconnect();
  }, [title, fit]);

  return (
    <Tag
      className={`mega-title ${className}`.trim()}
      ref={wrapRef}
      style={strokeColor ? { "--mega-title-stroke": strokeColor } : undefined}
    >
      <span
        className="mega-title__text"
        ref={textRef}
        style={{ transform: `scale(${scale})` }}
      >
        {title}
      </span>
    </Tag>
  );
}
