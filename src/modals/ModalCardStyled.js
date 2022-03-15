import styled from "styled-components";

export const StyledModalRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  button {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
  }
`;

export const StyledCloseIcon = styled.div`
  align-items: flex-end;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
  svg {
    float: right;
    flex-grow: 1;
    max-height: 24px;
    margin-top: -20px;
    z-index: 1000;
    /* margin-right: -1.5rem; */
  }
  svg:hover {
    color: ${(props) => (props.colorMode === "light" ? "#1d1d1b" : "#fae6c5")};
    stroke: ${(props) => (props.colorMode === "light" ? "#1d1d1b" : "#fae6c5")};
    &path {
      stroke-width: 1px;
    }
  }
`;

export const StyledSizesRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
