import React from "react";
import "./Button.css";

const STYLES = [
  "boton--primary--solid",
  "boton--primary--outline",
  "boton--primary--disabled",
//   "boton--warning--solid",
//   "boton--warning--outline",
//   "boton--danger--solid",
//   "boton--danger--outline",
//   "boton--success--solid",
//   "boton--success--outline",
];

const SIZES = ["boton--medium", "boton--small"];

export default function Button(props) {
  const { children, type, onClick, buttonStyle, buttonSize } = props;
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`boton ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      tupe={type}
    >
      {children}
    </button>
  );
}
