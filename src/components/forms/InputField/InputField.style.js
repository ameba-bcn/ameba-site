import styled from "styled-components";

export const Input = styled.input`
  display: block;
  width: -webkit-fill-available;
  padding: 12px 14px 2px 12px;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  background-color: transparent;
  border: 4px solid #1d1d1b;
  border-radius: 0rem;
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 18px;
  font-weight: bold;

  ${(props) =>
    !props.valid
      ? `
  border-color: #EB5E3E;
  transition: border-bottom 0.2s, border-top 0.2s, border-right 0.2s,
    border-left 0.2s ease-in-out;`
      : `border-color: #1d1d1b;`}

  ${(props) =>
    props.value &&
    `  
    background-color: #fae6c5;
`}
${(props) =>
    props.slimLine &&
    props.slimLine === false &&
    `  
    border-width: 3px;
`}

  &::placeholder {
    text-transform: uppercase;
    padding-top: 2px;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 2rem;
  }
  &:focus {
    background-color: #fae6c5;
    border-color: #f2c571;
    padding: 10px 14px 4px 12px;
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

export const InputLabelBox = styled.div`
  text-align: left;
  margin: 0px 0px -18px 13px;
  #link-box {
    position: relative;
    top: -2px;
    cursor: default;
  }
`;

export const InputLabel = styled.div`
  display: flex;
  align-items: center;
  background-color: #fae6c5;
  width: fit-content;
  color: #1d1d1b;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 1.2rem;
  z-index: 1;
  padding: 0px 4px 0px 4px;
  svg {
    width: 20px;
  }
  > div {
    top: -12px;
  }
`;
