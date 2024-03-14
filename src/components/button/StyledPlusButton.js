import styled from "styled-components";

export const StyledPlusButtonBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StyledPlusButton = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: ${(props) => (props.size === "plus--big" ? "76.8px" : "26px")};
  width: ${(props) => (props.size === "plus--small" ? "32px" : "64px")};
  height: ${(props) => (props.size === "plus--small" ? "32px" : "64px")};
  background-color: ${(props) =>
    props.colorStyle === "plus--ligth"
      ? "#fae6c5"
      : props.colorStyle === "plus--obscure"
      ? "#1d1d1b"
      : "#eb5e3e"};
  color: ${(props) =>
    props.colorStyle === "plus--ligth" ? "#1d1d1b" : "#FAE6C5"};
  svg {
    stroke-width: 3;
    font-size: ${(props) =>
      props.size === "plus--big"
        ? "60px"
        : props.size === "plus--small"
        ? "24px"
        : "40px"};
    width: 100%;
    height: auto;
    scale: 2;
    stroke: ${(props) =>
      props.colorStyle === "plus--ligth" ? "#1d1d1b" : "#fae6c5"};
  }
`;
