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
  justify-content: space-between;
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
  cursor: pointer;
  svg {
    float: right;
    max-height: 24px;
    margin-top: -20px;
    z-index: 1000;
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

export const StyledCenterLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 22px;
`;