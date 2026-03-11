import React from "react";
import { NavLink } from "react-router-dom";
import "./Breadcrums.style.css";

const Breadcrums = (props) => {
  const { steps, step, changeStep } = props;

  return (
    <div className="breadcrums">
      {steps.map((s, index) => (
        <NavLink
          key={s}
          className="menuOptions"
          to={`/profile/${s?.toLowerCase()}`}
        >
          {index !== 0 ? " / " : ""}
          <span
            className={step === index ? "active" : ""}
            onClick={() => changeStep(index)}
          >
            {s}
          </span>{" "}
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrums;
