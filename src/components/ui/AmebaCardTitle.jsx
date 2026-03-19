import React, { useRef, useEffect, useCallback } from "react";
import "./AmebaCardTitle.css";

export default function AmebaCardTitle({
  children,
  maxSize = 200,
  color,
  fontStyle,
  autoGrow = false,
  singleLine = false,
  overflow = "hidden",
  padding = "20px",
  className = "",
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const resize = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const containerWidth = container.clientWidth;
    if (containerWidth === 0) return;

    // Measure text width at maxSize with no wrapping
    text.style.whiteSpace = "nowrap";
    text.style.width = "auto";
    text.style.display = "inline";
    text.style.fontSize = `${maxSize}px`;

    const textWidth = text.scrollWidth;

    // Restore styles
    text.style.whiteSpace = "";
    text.style.width = "";
    text.style.display = "";

    if (textWidth > 0) {
      const size = Math.min(maxSize, Math.floor((containerWidth / textWidth) * maxSize));
      text.style.fontSize = `${size}px`;
    }
  }, [maxSize]);

  useEffect(() => {
    if (!autoGrow) return;

    const container = containerRef.current;
    if (!container) return;

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [autoGrow, resize, children]);

  return (
    <div
      className="ameba-card-title__container"
      ref={containerRef}
      style={{ "--title-color": color, "--title-font-style": fontStyle, "--title-padding": padding, "--title-overflow": overflow }}
    >
      <span
        ref={textRef}
        className={`ameba-card-title ${singleLine ? "ameba-card-title--single-line" : ""} ${className}`}
        style={{ "--max-title-size": `${maxSize}px` }}
      >
        {children}
      </span>
    </div>
  );
}
