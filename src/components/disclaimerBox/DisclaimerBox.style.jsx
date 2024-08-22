import styled from "styled-components";

export const SyledDisclaimer = styled.div`
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
  padding: 24px 26px 12px 26px;
  text-decoration: none !important;
  color: #1d1d1b !important;
  margin: 0 auto;
  word-wrap: break-word;
  width: auto;
  a {
    text-decoration: none;
  }
  #close-icon {
    position: absolute;
    top: 4px;
    right: 8px;
    cursor: pointer;
  }
`;
