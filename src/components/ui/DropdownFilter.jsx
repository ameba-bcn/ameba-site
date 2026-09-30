import React, { useRef, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import Icon from "./Icon";
import useOutsideClick from "../../hooks/use-outside-click";
import "./DropdownFilter.css";

export default function DropdownFilter({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  return (
    <div className="dropdown-filter" ref={wrapperRef}>
      <button
        type="button"
        className={`dropdown-filter__toggle${value ? " dropdown-filter__toggle--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {value || label}
        <Icon icon={open ? "arrowUp" : "arrowDown"} width="16" height="16" />
      </button>
      <Dropdown open={open} setIsOpen={setOpen} externalClickOutside>
        <button
          type="button"
          className="dropdown-filter__option"
          onClick={() => {
            onChange(null);
            setOpen(false);
          }}
        >
          {label}
        </button>
        {options.map((option) => {
          const { value: optionValue, label: optionLabel } =
            typeof option === "object" ? option : { value: option, label: option };
          return (
            <button
              type="button"
              key={optionValue}
              className="dropdown-filter__option"
              onClick={() => {
                onChange(optionValue);
                setOpen(false);
              }}
            >
              {optionLabel}
            </button>
          );
        })}
      </Dropdown>
    </div>
  );
}
