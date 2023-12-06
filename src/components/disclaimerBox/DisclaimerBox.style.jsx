import styled from "styled-components";

export const SyledDisclaimer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "Bebas Neue";
  font-size: 30px;
  border-style: solid;
  line-height: 30px;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "#1D1D1B"};
  border-width: 8px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#eb5e3e")};
  margin-top: 20px;
  padding: 12px;
  text-decoration: none !important;
  color: #1d1d1b !important;
  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;
