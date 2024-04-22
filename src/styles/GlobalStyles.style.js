import styled from "styled-components";

export const Paragraph1 = styled.div`
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 1.2rem;
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
  margin: 0px 8rem 30px 8rem;
  @media screen and (max-width: 980px) {
    margin: 0px 4rem 30px 4rem;
  }
`;
