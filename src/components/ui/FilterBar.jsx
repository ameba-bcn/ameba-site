import React from "react";
import "./FilterBar.css";

export default function FilterBar({ items, activeItem, onSelect, allLabel = "Tot" }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-bar__btn ${activeItem === null ? "filter-bar__btn--active" : ""}`}
        onClick={() => onSelect(null)}
      >
        {allLabel}
      </button>
      {items.map((item) => (
        <button
          key={item}
          className={`filter-bar__btn ${activeItem === item ? "filter-bar__btn--active" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
