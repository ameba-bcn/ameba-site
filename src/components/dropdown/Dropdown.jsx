import React, { useRef } from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import styled from "styled-components";

export const StyledPopoverMenu = styled.div`
  right: 20px;
  padding: 10px 20px;
  width: auto;
  min-width: 120px;
  outline: 0;
  position: absolute;
  max-width: calc(100% - 32px);
  min-height: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: var(--color-cream);
  z-index: 500;
`;

const Dropdown = ({
  children,
  open = false,
  setIsOpen,
  refer = useRef("dropdown"),
  externalClickOutside = false,
}) => {
  const dropdownRef = useRef("dropdown");

  useOutsideClick(refer || dropdownRef, () => {
    if (open && !externalClickOutside) setIsOpen(false);
  });

  return open ? (
    <div ref={refer || dropdownRef}>
      <StyledPopoverMenu>{children}</StyledPopoverMenu>
    </div>
  ) : null;
};

export default Dropdown;
