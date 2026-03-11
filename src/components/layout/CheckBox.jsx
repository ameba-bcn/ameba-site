import React from "react";
import "./CheckBox.css";

const CheckBox = ({ label = "", checked, onChange, disabled = false }) => (
  <div className="check-box">
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onClick={() => onChange(checked)}
          disabled={disabled}
          onChange={() => {}}
        />
        <span className="checkbox"></span>
        <span>{label}</span>
      </label>
    </div>
  </div>
);

export default CheckBox;
