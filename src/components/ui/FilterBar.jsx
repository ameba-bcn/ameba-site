import React from "react";
import "./FilterBar.css";

export default function FilterBar({
  items,
  activeItem,
  onSelect,
  allLabel = "Tot",
  variant = "outline",
  resetLabel,
}) {
  const barClass = `filter-bar${variant === "solid" ? " filter-bar--solid" : ""}`;

  return (
    <div className={barClass}>
      {allLabel && (
        <button
          className={`filter-bar__btn ${activeItem === null ? "filter-bar__btn--active" : ""}`}
          onClick={() => onSelect(null)}
        >
          {allLabel}
        </button>
      )}
      {items.map((item) => (
        <button
          key={item}
          className={`filter-bar__btn ${activeItem === item ? "filter-bar__btn--active" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
      {resetLabel && (
        <button
          className="filter-bar__btn filter-bar__btn--reset"
          onClick={() => onSelect(null)}
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
