import React from "react";
import Spinner from "../spinner/Spinner";
import "./StatusPanel.css";

const DOT_COLORS = [
  "var(--color-naranja)",
  "var(--color-rojo)",
  "var(--color-amarillo)",
  "var(--color-cream)",
];

export default function StatusPanel({
  tone = "neutral",
  loading,
  eyebrow,
  title,
  text,
  actions,
  children,
}) {
  return (
    <div className={`status-panel status-panel--${tone}`}>
      <div className="status-panel__dots">
        {DOT_COLORS.map((color) => (
          <span
            key={color}
            className="status-panel__dot"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {loading ? (
        <div className="status-panel__loading">
          <Spinner size={40} />
        </div>
      ) : (
        <>
          {eyebrow && <span className="status-panel__eyebrow">{eyebrow}</span>}
          <h1 className="status-panel__title">{title}</h1>
          {text && <p className="status-panel__text">{text}</p>}
          {children}
          {actions && <div className="status-panel__actions">{actions}</div>}
        </>
      )}
    </div>
  );
}
