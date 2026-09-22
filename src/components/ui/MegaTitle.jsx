import React, { useLayoutEffect, useRef, useState } from "react";
import "./MegaTitle.css";

/**
 * Título gigante en outline (Arimo, trazo, relleno transparente) que se
 * encoge en escala uniforme (sin deformar) si no cabe en su contenedor —
 * la misma lógica que ya usaba SectionBand.jsx en Home, extraída aquí para
 * reutilizarla en cualquier sitio con este tratamiento (SectionHero, etc.).
 * Solo controla tipografía + fit; el llamante decide tamaño/posición vía
 * className (ver .section-band__megatitle / .section-hero__outline-title).
 *
 * `renderAs="svg"` (opt-in, default "text"): dibuja el trazo con un
 * <text> SVG en vez de -webkit-text-stroke — evita un bug de
 * Chromium/Skia donde el trazo se ve pixelado/serrado en tamaños de
 * fuente gigantes (200px+) sobre pantallas Windows no-Retina (ver
 * MegaTitle.css). Cada carácter se renderiza en su propio <tspan>
 * (.mega-title__svg-text > tspan) para que use-page-enter.js pueda
 * animarlos igual que hacía con SplitText en el modo texto — la versión
 * de GSAP instalada no soporta SplitText sobre <text> SVG, así que aquí
 * el split lo hace el propio componente. stroke-width se controla vía
 * la prop `strokeWidth` (atributo SVG, no CSS) para que ese mismo hook
 * pueda animarlo con GSAP sin que una regla CSS le gane la cascada.
 */
export default function MegaTitle({
  title,
  as: Tag = "h1",
  className = "",
  fit = true,
  strokeColor,
  strokeWidth = 2,
  renderAs = "text",
}) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [box, setBox] = useState(null);
  const isSvg = renderAs === "svg";

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return undefined;

    const measure = () => {
      const styles = window.getComputedStyle(wrap);
      const available =
        wrap.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);

      if (isSvg) {
        // jsdom (tests) doesn't implement getBBox — skip sizing there,
        // real browsers all support it.
        if (typeof text.getBBox !== "function") return;
        const bbox = text.getBBox();
        if (bbox.width > 0) setBox(bbox);
        if (!fit) {
          setScale(1);
          return;
        }
        if (bbox.width > 0 && available > 0)
          setScale(Math.min(1, available / bbox.width));
        return;
      }

      if (!fit) return;
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
    if (!isSvg) observer.observe(text);
    return () => observer.disconnect();
  }, [title, fit, isSvg]);

  if (isSvg) {
    return (
      <Tag
        className={`mega-title ${className}`.trim()}
        ref={wrapRef}
        aria-label={title}
        style={strokeColor ? { "--mega-title-stroke": strokeColor } : undefined}
      >
        <svg
          className="mega-title__svg"
          aria-hidden="true"
          width={box ? box.width * scale : undefined}
          height={box ? box.height * scale : undefined}
          viewBox={box ? `${box.x} ${box.y} ${box.width} ${box.height}` : undefined}
          preserveAspectRatio="xMinYMin meet"
        >
          <text
            ref={textRef}
            className="mega-title__svg-text"
            x="0"
            y="0"
            xmlSpace="preserve"
            strokeWidth={strokeWidth}
          >
            {Array.from(title).map((char, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <tspan key={i}>{char}</tspan>
            ))}
          </text>
        </svg>
      </Tag>
    );
  }

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
