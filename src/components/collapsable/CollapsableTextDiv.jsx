import React, { useState } from "react";
import "./CollapsableTextDiv.css";
import PlusButton from "../button/PlusButton";

export default function CollapsableTextDiv(props) {
  const { text = "" } = props;
  const maxLength = 180;
  const minimizedText = text.substring(0, maxLength) + "...";
  const isLargeText = text.length > maxLength;
  const [open, setOpen] = useState(false);

  return open || !isLargeText ? (
    <>{text}</>
  ) : (
    <div className="collapsable-text-div__plus-box">
      {minimizedText}
      <PlusButton
        plusStyle="plus--ligth"
        plusSize="plus--small"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}
