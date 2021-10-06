import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const StepperBox = styled.div`
  width: 100%;
  height: 20px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

export const Dot = styled.span`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
  ${(props) =>
    props.index === props.activeStep
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
