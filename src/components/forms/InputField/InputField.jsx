import React from "react";
import { Input, InputLabel, InputLabelBox } from "./InputField.style.js";

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
    ...rest
  } = props;
  return (
    <>
      {label && (
        <InputLabelBox>
          <InputLabel>{label}</InputLabel>
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
          {...rest}
        ></Input>
      )}
    </>
  );
}
