import React from "react";
import styled from "styled-components";

export const StyledTooltip = styled.div`
  position: relative;
  .tooltipSpan {
    display: none;
    opacity: 0;
  }

  &:hover {
    .tooltipSpan {
      display: block;
      position: absolute;
      opacity: 1;
    }
  }
  .tooltipSpan {
    width: 100%;
    max-width: 120px;
    background-color: var(--color-negro);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 28px;
    transition: opacity 0.5s ease-in-out;
  }

  .tooltipSpan::after {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const Tooltip = (props) => {
  const { children, tooltipContent = "" } = props;
  return (
    <StyledTooltip>
      {children}
      {tooltipContent?.length > 0 && (
        <span className="tooltipSpan">{tooltipContent}</span>
      )}
    </StyledTooltip>
  );
};

export default Tooltip;
