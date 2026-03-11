import React from "react";
import "./Tooltip.css";

const Tooltip = (props) => {
  const { children, tooltipContent = "" } = props;
  return (
    <div className="tooltip-wrapper">
      {children}
      {tooltipContent?.length > 0 && (
        <span className="tooltipSpan">{tooltipContent}</span>
      )}
    </div>
  );
};

export default Tooltip;
