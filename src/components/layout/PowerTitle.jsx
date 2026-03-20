import React from "react";
import AmebaCardTitle from "../ui/AmebaCardTitle";
import "./PowerTitle.css";

function PowerTitle(props) {
  const {
    subtitle,
    color = "var(--color-negro)",
    fontStyle = "normal",
    maxSize = 220,
    autoScale = false,
    marginTop,
  } = props;

  return (
    <div className={`power-title__box${marginTop ? ` power-title__box--mt-${marginTop}` : ""}`}>
      <div className="power-title__title">
        <AmebaCardTitle
          maxSize={maxSize}
          color={color}
          fontStyle={fontStyle}
          autoGrow={autoScale}
          singleLine
          className={autoScale ? "ameba-card-title--no-pad" : ""}
        >
          {props.title}
        </AmebaCardTitle>
      </div>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
