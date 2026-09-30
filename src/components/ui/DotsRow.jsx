import React from "react";
import "./Dots.css";

export default function DotsRow({ count = 7, className = "" }) {
  return (
    <div className={`dots-row ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="dots-row__dot" />
      ))}
    </div>
  );
}
