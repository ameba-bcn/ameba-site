import React from "react";
import AmebaLogo from "../ui/logo/AmebaLogo";
import "./Spinner.css";

const AmebaSpinner = ({ height, color = "black" }) => {
  return (
    <div
      className="spinner-frame"
      style={height ? { minHeight: `${height}px` } : undefined}
    >
      <div className="spinner-logo">
        <AmebaLogo width="100" height="100" fill="var(--color-negro)" />
      </div>
    </div>
  );
};

export default AmebaSpinner;
