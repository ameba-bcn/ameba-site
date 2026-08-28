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
export default function MegaTitle({ title, as: Tag = "h1", className = "" }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
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
    <Tag className={`mega-title ${className}`.trim()} ref={wrapRef}>
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
