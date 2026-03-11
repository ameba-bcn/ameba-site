import React from "react";
import "./Spinner.css";

const Spinner = ({ height, color = "white" }) => {
  return (
    <div className="spinner-frame" style={height ? { minHeight: `${height}px` } : undefined}>
      <div className={`spinner spinner--${color === "white" ? "white" : "black"} loading`}>
        Loading
      </div>
    </div>
  );
};

export default Spinner;
