import React, { useState } from "react";
import "./DisclaimerBox.style.css";
import Icon from "../ui/Icon";

const DisclaimerBox = ({
  text = "",
  id,
  closable = false,
  style = "light",
}) => {
  const [hide, setHide] = useState(false);

  const classNames = ["disclaimer-box"];
  if (style === "light") classNames.push("disclaimer-box--light");

  return (
    !hide && (
      <div className={classNames.join(" ")} id={id}>
        {text}
        {closable && (
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
