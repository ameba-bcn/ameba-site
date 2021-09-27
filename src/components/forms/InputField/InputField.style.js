import styled from "styled-components";

export const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* background-color: #fae6c5; */
  background-color: transparent;
  border: 4px solid #1d1d1b;
  border-radius: 0rem;
  padding-top: 14px;
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 1.2rem;
  font-weight: bold;

  ${(props) =>
    !props.valid
      ? `
  border-bottom: solid rgb(155, 6, 6) 4px;
  border-top: solid transparent 4px !important;
  border-right: solid transparent 4px !important;
  border-left: solid transparent 4px !important;
  transition: border-bottom 0.2s, border-top 0.2s, border-right 0.2s,
    border-left 0.2s ease-in-out;`
      : `border: 4px solid #1d1d1b;`}

  ${(props) =>
    props.value &&
    `  
    background-color: #fae6c5;
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
    border: 4px solid #f2c571;
  }
  &:touch {
    background-color: #fae6c5;
  }
  /* &:-internal-autofill-selected,
  :-webkit-autofill:focus {
    background-color: #fae6c5 !important;
  } */
  &:disabled {
    border-top: solid transparent 4px !important;
    border-right: solid transparent 4px !important;
    border-left: solid transparent 4px !important;
  }
`;

export const InputLabelBox = styled.div`
  text-align: left;
  margin: 0px 0px -18px 13px;
`;

export const InputLabel = styled.div`
  display: inline-block;
  background-color: #fae6c5;
  width: min-content;
  color: #1d1d1b;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 1.2rem;
  z-index: 1;
  padding: 0px 4px 0px 4px;
`;
