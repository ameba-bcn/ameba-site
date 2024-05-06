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

const HOVER = ["bg-red", "bg-cream", "bg-orange"];

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
    className,
    ...rest
  } = props;
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkHoverStyle = HOVER.includes(hoverStyle) ? hoverStyle : HOVER[0];

  return (
    <button
      className={`boton ${checkButtonStyle} ${checkButtonSize} ${
        !disabled && checkHoverStyle
      } ${disabled ? "button-disabled" : ""} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
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
