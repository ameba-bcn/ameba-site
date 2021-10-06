import React from "react";
import { StepperBox, Dot } from "./Stepper.style";

export default function Stepper(props) {
  const { arraySteps = [], activeStep } = props;

  return (
    <StepperBox>
      {arraySteps.map((x, index) => {
        return <Dot key={x} activeStep={activeStep} index={index} />;
      })}
    </StepperBox>
  );
}
