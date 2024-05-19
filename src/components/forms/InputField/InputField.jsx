import React from "react";
import { Input, InputLabel, InputLabelBox } from "./InputField.style.js";
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
    tooltip = "",
    ...rest
  } = props;
  return (
    <>
      {label && (
        <InputLabelBox>
          {tooltip.length > 0 ? (
            <Tooltip tooltipContent={tooltip}>
              <InputLabel id="link-box">
                {label}
                <Icon icon="tooltip" />
              </InputLabel>
            </Tooltip>
          ) : (
            <InputLabel id="link-box">{label}</InputLabel>
          )}
        </InputLabelBox>
      )}
      {unstyled ? (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        ></input>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          slimLines={slimLines}
          {...rest}
        ></Input>
      )}
    </>
  );
}
