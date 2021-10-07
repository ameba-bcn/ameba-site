import React from "react";
import { StepperBox, Dot, DotsBox } from "./Stepper.style";

export default function Stepper(props) {
  const { arraySteps = [], activeStep } = props;

  return (
    <StepperBox activeStep={activeStep}>
      <DotsBox>
        {arraySteps.map((x, index) => {
          return <Dot key={x} activeStep={activeStep} index={index} />;
        })}
      </DotsBox>
    </StepperBox>
  );
}
