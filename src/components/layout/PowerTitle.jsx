import React from "react";
import { ReactFitty } from "react-fitty";
import "./PowerTitle.css";

function PowerTitle(props) {
  const { subtitle } = props;

  return (
    <div className="power-title__box">
      <div className="power-title__title">
        <ReactFitty maxSize={220}>{props.title}</ReactFitty>
      </div>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
