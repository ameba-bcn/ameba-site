import React from "react";
import "./Dots.css";

export default function DotsColumn({ count = 9, className = "" }) {
  return (
    <div className={`dots-column ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="dots-column__dot" />
      ))}
    </div>
  );
}
