import styled from "styled-components";

export const StyledExternalEventBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Bebas Neue";
  .rowExternal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
  }
`;

export const StyledExternalEventCol1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 580px;
  min-width: 180px;
  padding: 20px;
  height: 100%;
  @media (max-width: 542px) {
    margin: 0px 30px;
    width: 100%;
    max-width: inherit;
    min-width: inherit;
  }
`;

export const StyledExternalEventCol2 = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-width: 480px;
  padding: 20px;
  height: 100%;
  @media (max-width: 542px) {
    margin: 0px 30px;
    width: 100%;
    max-width: inherit;
    min-width: inherit;
  }
`;

export const StyledExternalButtonBox = styled.div`
  width: 100%;
  padding-top: 20px;
  button {
    width: 100%;
    max-width: 457px;
    &:hover {
      #hoverable-black {
        svg > path {
          fill: var(--color-negro);
        }
      }
    }
  }
`;

export const StyledTitleBox = styled.div`
  padding-top: 20px;
  max-width: 1060px;
  width: 80%;
`;
