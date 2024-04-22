import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const StepperBox = styled.h1`
  min-width: 100%;
  display: inline-block;
  position: relative;
  z-index: 0;
  :before {
    content: "";
    width: 100%;
    height: 4px;
    left: 0;
    position: absolute;
    ${(props) =>
      0 === props.activeStep
        ? `background: linear-gradient(to right, #1d1d1b 50%, #1d1d1b 50%);`
        : 1 === props.activeStep
        ? `background: linear-gradient(to right, #eb5e3e 50%, #1d1d1b 50%);`
        : ` background: linear-gradient(to right, #eb5e3e 50%, #eb5e3e 50%);`}
  }
`;

export const DotsBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
  z-index: 9;
`;

export const Dot = styled.span`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  z-index: 9;
  ${(props) =>
    props.index <= props.activeStep
      ? `background-color: #EB5E3E;
    animation: appearFromCenter .1s;`
      : `background-color: #1D1D1B;`}

  @keyframes appearFromCenter {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;
