import React, { useState, useRef, useEffect } from "react";
import "./CollapsableTextDiv.css";
import PlusButton from "../button/PlusButton";
import { urlify } from "../../utils/utils";

export default function CollapsableTextDiv(props) {
  const { text = "" } = props;
  const maxLength = 180;
  const isLargeText = text.length > maxLength;
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("4.5em");

  useEffect(() => {
    if (isLargeText && contentRef.current) {
      setMaxHeight(open ? `${contentRef.current.scrollHeight}px` : "4.5em");
    }
  }, [open, isLargeText, text]);

  const rendered = urlify(text) || text;

  if (!isLargeText) {
    return <>{rendered}</>;
  }

  return (
    <div className="collapsable-text-div">
      <div
        ref={contentRef}
        className={`collapsable-text-div__content${open ? " collapsable-text-div__content--open" : ""}`}
        style={{ maxHeight }}
      >
        {rendered}
      </div>
      {!open && (
        <div className="collapsable-text-div__plus-box">
          <PlusButton
            plusStyle="plus--ligth"
            plusSize="plus--small"
            onClick={() => setOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
