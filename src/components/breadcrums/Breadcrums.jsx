import React from "react";
import { NavLink } from "react-router-dom";
import "./Breadcrums.style.css";

const Breadcrums = (props) => {
  const { steps, step, changeStep } = props;

  return (
    <div className="breadcrums">
      {steps.map((s, index) => (
        <NavLink
          key={s.path}
          className="menuOptions"
          to={`/profile/${s.path}`}
        >
          {index !== 0 ? " / " : ""}
          <span
            className={step === index ? "active" : ""}
            onClick={() => changeStep(index)}
          >
            {s.label}
          </span>{" "}
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrums;
