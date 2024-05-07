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
  button:hover:not([disabled]) {
    #hoverable-black-svg {
      path {
        fill: var(--color-negro);
      }
    }
  }
`;

export const StyledCloseIcon = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
  svg {
    float: right;
    max-height: 24px;
    margin-top: -20px;
    z-index: 1000;
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
