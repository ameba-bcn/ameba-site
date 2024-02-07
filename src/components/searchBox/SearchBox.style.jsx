import styled, { keyframes } from "styled-components";

const wideExpandAnimation = keyframes`
  0% { width: 0px; ; opacity: 0.6;}
  100% {width: 250px ; opacity: 1;}
`;

const wideCollapseAnimation = keyframes`
  0% {font-size: 28px ; opacity: 0.8;}
  100% { font-size: 30px; ; opacity: 1;}
`;

export const StyledSearchBox = styled.input`
  display: block;
  width: 100%;
  max-width: 250px;
  height: 38px;
  padding: 6px 12px 8px 12px;
  line-height: 28px;
  background-clip: padding-box;
  background-color: transparent;
  border: 2px solid #1d1d1b;
  border-radius: 0rem;
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 28px;
  animation-name: ${wideExpandAnimation};
  animation-duration: 0.5s;
  animation-timing-function: ease-in;

  &::placeholder {
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 22px;
    font-weight: 300;
  }
  &:focus {
    background-color: #fae6c5;
    border-color: #f2c571;
    font-size: 22px;
    padding-bottom: 1px;
  }
  &:touch {
    background-color: #fae6c5;
  }

  &:disabled {
    border-top: solid transparent 4px !important;
    border-right: solid transparent 4px !important;
    border-left: solid transparent 4px !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fae6c5 inset !important;
  }
`;

export const StyledIconSearchBox = styled.div`
  div {
    cursor: pointer;
  }
  height: 38px;
  display: flex;
  justify-content: center;
  svg {
    font-size: 30px;

    animation-name: ${wideCollapseAnimation};
    animation-duration: 0.2s;
    animation-timing-function: ease-in;
  }
`;
