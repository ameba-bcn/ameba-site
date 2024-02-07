import React from "react";
import { BreadcrumsStyled } from "./Breadcrums.style";

const Breadcrums = (props) => {
  const { steps, step, changeStep } = props;

  return (
    <BreadcrumsStyled>
      {steps.map((s, index) => (
        <div key={s}>
          {index !== 0 ? " / " : ""}
          <span
            className={step === index ? "active" : ""}
            onClick={() => changeStep(index)}
          >
            {s}
          </span>{" "}
        </div>
      ))}
    </BreadcrumsStyled>
  );
};

export default Breadcrums;
