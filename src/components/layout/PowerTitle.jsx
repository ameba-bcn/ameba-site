import React from "react";
import "./PowerTitle.css";

function PowerTitle({ title, subtitle, color = "var(--color-negro)", fontStyle = "normal", marginTop }) {
  return (
    <div className={`power-title__box${marginTop ? ` power-title__box--mt-${marginTop}` : ""}`}>
      <h1
        className="power-title__title"
        style={{ color, fontStyle }}
      >
        {title}
      </h1>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
