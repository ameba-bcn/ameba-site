import React, { useState } from "react";
import { SyledDisclaimer } from "./DisclaimerBox.style";
import ClearIcon from "@material-ui/icons/Clear";

const DisclaimerBox = (props) => {
  const { text = "", id = "", borderColor = "#eb5e3e" } = props;
  const [hide, setHide] = useState(false);
  return (
    !hide && (
      <SyledDisclaimer id={id} borderColor={borderColor}>
        {text}
        <ClearIcon className="close-icon" onClick={() => setHide(true)} />
      </SyledDisclaimer>
    )
  );
};

export default DisclaimerBox;
