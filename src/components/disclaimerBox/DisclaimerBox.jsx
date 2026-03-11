import React, { useState } from "react";
import "./DisclaimerBox.style.css";
import Icon from "../ui/Icon";

const DisclaimerBox = (props) => {
  const {
    text = "",
    id = "",
    borderColor,
    bgColor,
    className,
    hideCloseIcon = false,
  } = props;
  const [hide, setHide] = useState(false);

  const dynamicStyle = {};
  if (borderColor) dynamicStyle.borderColor = borderColor;
  if (bgColor) dynamicStyle.backgroundColor = bgColor;

  return (
    !hide && (
      <div
        className={`disclaimer-box ${className || ""}`}
        style={dynamicStyle}
        id={id}
      >
        {text}
        {!hideCloseIcon && (
          <Icon
            icon="clear"
            onClick={() => setHide(true)}
            type="hoverable-red"
            className="close-icon"
          />
        )}
      </div>
    )
  );
};

export default DisclaimerBox;
