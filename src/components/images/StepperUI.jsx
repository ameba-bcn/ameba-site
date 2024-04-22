import React from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";

const StyledStepperUI = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: absolute;
  top: -220px;
  width: 90%;
  @media (max-width: 420px) {
    top: -190px;
  }
  @media (max-width: 320px) {
    top: -160px;
  }
`;

const StepperUI = ({ handleBack, handleNext, steps, activeStep }) => {
  return (
    <StyledStepperUI>
      {activeStep === 0 ? (
        <div />
      ) : (
        <Icon icon="arrowLeft" onClick={handleBack} />
      )}
      {activeStep === steps - 1 ? (
        <div />
      ) : (
        <Icon icon="arrowRight" onClick={handleNext} />
      )}
    </StyledStepperUI>
  );
};

export default StepperUI;
