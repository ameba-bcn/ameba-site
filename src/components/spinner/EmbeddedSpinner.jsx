import React from "react";
import "./Spinner.css";

const EmbeddedSpinner = ({ height, color = "white", alone = false }) => {
  const spinner = <div className="spinner" id="spinner" />;
  if (alone) {
    return <div className="centered-element">{spinner}</div>;
  }
  return spinner;
};

export default EmbeddedSpinner;
