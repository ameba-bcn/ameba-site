import React from "react";
import "./PowerTitle.css";

function PowerTitle(props) {
  const { subtitle } = props;
  return (
    <div className="BGWrapper">
      <div className="PowerTitle">{props.title} </div>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
