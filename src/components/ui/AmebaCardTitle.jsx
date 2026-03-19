import React from "react";
import "./AmebaCardTitle.css";

export default function AmebaCardTitle({
  children,
  maxSize = 200,
  className = "",
}) {
  return (
    <div className="ameba-card-title__container">
      <span
        className={`ameba-card-title ${className}`}
        style={{ "--max-title-size": `${maxSize}px` }}
      >
        {children}
      </span>
    </div>
  );
}
