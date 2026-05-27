import React, { useRef, useEffect, useCallback } from "react";
import "./PowerTitle.css";

function PowerTitle({
  title,
  subtitle,
  color = "var(--color-negro)",
  fontStyle = "normal",
  marginTop,
}) {
  const titleRef = useRef(null);

  const fit = useCallback(() => {
    const el = titleRef.current;
    if (!el) return;

    // Reset inline font-size so the CSS media-query value applies
    el.style.fontSize = "";

    const scrollW = el.scrollWidth;
    const clientW = el.clientWidth;

    // Only shrink when the text overflows; short titles keep their CSS size
    if (scrollW > clientW && clientW > 0) {
      const cssSize = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${cssSize * (clientW / scrollW)}px`;
    }
  }, []);

  useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(titleRef.current);
    return () => ro.disconnect();
  }, [title, fit]);

  return (
    <div
      className={`power-title__box${marginTop ? ` power-title__box--mt-${marginTop}` : ""}`}
    >
      <h1 ref={titleRef} className="power-title__title" style={{ color, fontStyle }}>
        {title}
      </h1>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
