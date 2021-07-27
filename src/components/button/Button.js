import React from "react";
import "./Button.css";

const STYLES = [
  "boton--primary--solid",
  "boton--primary--outline",
  "boton--primary--disabled",
  "boton--orange--solid",
  "boton--back-orange--solid"
];

const SIZES = ["boton--medium", "boton--small", "boton--big", "boton--megaxxl"];

export default function Button(props) {
  const { children, type, onClick, buttonStyle, buttonSize, icon } = props;
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`boton ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {icon && (
        <>
          {icon} {children}
        </>
      )}
      {!icon && <>{children}</>}
    </button>
  );
}
