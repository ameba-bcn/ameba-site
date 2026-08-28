import React from "react";
import "./CardGrid.css";

export default function CardGrid({ children, className = "" }) {
  return <div className={`card-grid ${className}`.trim()}>{children}</div>;
}
