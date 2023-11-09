import React from "react";
import { BreadcrumsStyled } from "./Breadcrums.style";

const Breadcrums = (props) => {
  const { steps, step, changeStep } = props;

  return (
    <BreadcrumsStyled>
      {steps.map((s, index) => (
        <span
          className={step === index ? "active" : ""}
          onClick={() => changeStep(index)}
          key={s}
        >
          {" "}
          {`${s} ${index === steps.length - 1 ? " " : " / "}`}{" "}
        </span>
      ))}
    </BreadcrumsStyled>
  );
};

export default Breadcrums;
