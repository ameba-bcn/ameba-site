import React from "react";
import "./Button.css";

const STYLES = [
  "boton--primary--solid",
  "boton--primary--outline",
  "boton--primary--disabled",
  "boton--orange--solid",
  "boton--back-orange--solid",
];

const SIZES = ["boton--medium", "boton--small", "boton--big", "boton--megaxxl"];

const HOVER = ["bg-red", "bg-cream"];

export default function Button(props) {
  const {
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    hoverStyle,
    icon,
    disabled,
    ...rest
  } = props;
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkHoverStyle = HOVER.includes(hoverStyle) ? hoverStyle : HOVER[0];

  return (
    <button
      className={`boton ${checkButtonStyle} ${checkButtonSize} ${!disabled && checkHoverStyle} ${disabled?"button-disabled":""}`}
      onClick={onClick}
      type={type}
      {...rest}
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
