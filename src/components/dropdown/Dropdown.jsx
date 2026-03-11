import React, { useRef } from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import "./Dropdown.css";

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
      <div className="popover-menu">{children}</div>
    </div>
  ) : null;
};

export default Dropdown;
