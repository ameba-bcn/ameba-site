import styled from "styled-components";

export const TitleInnerSection = styled.div`
  font-size: 40px;
  font-family: "Bebas Neue";
  font-weight: 400;
`;

export const RowSeparator = styled.div`
  width: ${(props) => (props.width ? `${props.width}%` : "85%")};
  height: 2px;
  border-bottom: ${(props) =>
    props.border ? `${props.border}` : "2px solid black"};
  margin: 5px auto;
`;

export const StyledHeightBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : "24px")};
`;

export const StyledMainColumnView = styled.div`
  padding: 0 60px;
  margin-bottom: 60px;
  @media screen and (max-width: 980px) {
    padding: 0 20px;
  }
`;
