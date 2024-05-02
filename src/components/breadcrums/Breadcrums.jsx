import React from "react";
import { NavLink } from "react-router-dom";
import { BreadcrumsStyled } from "./Breadcrums.style";

const Breadcrums = (props) => {
  const { steps, step, changeStep } = props;

  return (
    <BreadcrumsStyled>
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
    </BreadcrumsStyled>
  );
};

export default Breadcrums;
