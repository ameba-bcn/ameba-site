import React from "react";
import "./InputField.style.css";
import Tooltip from "../../tooltip/Tooltip.jsx";
import Icon from "../../ui/Icon.jsx";

export default function InputField(props) {
  const {
    id,
    name,
    type,
    placeholder,
    className,
    onChange,
    onBlur,
    value,
    label,
    unstyled = false,
    slimLines = false,
    valid,
    slimLine,
    tooltip = "",
    ...rest
  } = props;

  const inputClassName = unstyled
    ? className
    : [
        "input-field__input",
        valid === false || valid === 0 ? "input-field__input--invalid" : "",
        value ? "input-field__input--has-value" : "",
        slimLine === false ? "input-field__input--slim-line" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ");

  return (
    <>
      {label && (
        <div className="input-field__label-box">
          {tooltip.length > 0 ? (
            <Tooltip tooltipContent={tooltip}>
              <div className="input-field__label" id="link-box">
                {label}
                <Icon icon="tooltip" />
              </div>
            </Tooltip>
          ) : (
            <div className="input-field__label" id="link-box">{label}</div>
          )}
        </div>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...rest}
      />
    </>
  );
}
