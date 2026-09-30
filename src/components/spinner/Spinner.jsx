import React from "react";
import "./Spinner.css";

// Single spinner used everywhere in the app (was split across AmebaSpinner,
// EmbeddedSpinner and a couple of raw ad-hoc markups). The mark is the
// Ameba logo (assets/logo/logo-ameba.svg) used as a CSS mask rather than an
// <img>, so it renders in `currentColor` and can cycle through the brand
// palette regardless of what background it's placed on.
export default function Spinner({ size = 40, alone = false, className = "" }) {
  const mark = (
    <span
      className={`spinner-mark${className ? ` ${className}` : ""}`}
      style={{ "--spinner-size": `${size}px` }}
      role="status"
      aria-label="Loading"
    />
  );

  if (alone) {
    return <span className="spinner-wrapper">{mark}</span>;
  }

  return mark;
}
