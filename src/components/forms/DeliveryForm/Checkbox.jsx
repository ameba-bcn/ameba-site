import React from "react";

export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <label className="abm-checkbox" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="abm-checkbox__box" aria-hidden="true" />
      <span className="abm-checkbox__label">{label}</span>
    </label>
  );
}
