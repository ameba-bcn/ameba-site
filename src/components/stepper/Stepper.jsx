import React from "react";
import "./Stepper.style.css";

export default function Stepper(props) {
  const { arraySteps = [], activeStep } = props;

  const stepClass =
    activeStep === 0
      ? "stepper-box--step-0"
      : activeStep === 1
      ? "stepper-box--step-1"
      : "stepper-box--step-2";

  return (
    <h1 className={`stepper-box ${stepClass}`}>
      <div className="stepper-dots-box">
        {arraySteps.map((x, index) => {
          return (
            <span
              key={x}
              className={`stepper-dot${index <= activeStep ? " stepper-dot--active" : ""}`}
            />
          );
        })}
      </div>
    </h1>
  );
}
