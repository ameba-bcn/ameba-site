import React from "react";
import { SyledDisclaimer } from "./DisclaimerBox.style";

const DisclaimerBox = (props) => {
  const { text = "", id = "", borderColor = "#eb5e3e" } = props;
  return (
    <SyledDisclaimer id={id} borderColor={borderColor}>
      {text}
    </SyledDisclaimer>
  );
};

export default DisclaimerBox;
