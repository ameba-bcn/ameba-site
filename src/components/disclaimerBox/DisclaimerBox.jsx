import React, { useState } from "react";
import { SyledDisclaimer } from "./DisclaimerBox.style";
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
  return (
    !hide && (
      <SyledDisclaimer
        className={className}
        bgColor={bgColor}
        id={id}
        borderColor={borderColor}
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
      </SyledDisclaimer>
    )
  );
};

export default DisclaimerBox;
