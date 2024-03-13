import React, { useState } from "react";
import { SyledDisclaimer } from "./DisclaimerBox.style";
import Icon from "../ui/Icon";

const DisclaimerBox = (props) => {
  const { text = "", id = "", borderColor = "#eb5e3e" } = props;
  const [hide, setHide] = useState(false);
  return (
    !hide && (
      <SyledDisclaimer id={id} borderColor={borderColor}>
        {text}
        <Icon
          icon="clear"
          onClick={() => setHide(true)}
          type="hoverable-red"
          className="close-icon"
        />
      </SyledDisclaimer>
    )
  );
};

export default DisclaimerBox;
