import styled from "styled-components";

export const SyledDisclaimer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "Bebas Neue";
  font-size: 30px;
  border-style: solid;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "#eb5e3e"};
  margin-top: 20px;
  text-decoration: none !important;
  color: #1d1d1b !important;
`;
