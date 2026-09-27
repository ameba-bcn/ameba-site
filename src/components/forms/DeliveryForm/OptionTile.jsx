import React from "react";

export default function OptionTile({
  id,
  name,
  value,
  checked,
  onChange,
  title,
  price,
  subtitle,
}) {
  return (
    <label
      className={`option-tile${checked ? " option-tile--selected" : ""}`}
      htmlFor={id}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="option-tile__mark" aria-hidden="true" />
      <span className="option-tile__body">
        <span className="option-tile__row">
          <span className="option-tile__title">{title}</span>
          <span className="option-tile__price">{price}</span>
        </span>
        <span className="option-tile__subtitle">{subtitle}</span>
      </span>
    </label>
  );
}
