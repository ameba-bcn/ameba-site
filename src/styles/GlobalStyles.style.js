import styled from "styled-components";

export const Paragraph1 = styled.div`
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 1.2rem;
`;

export const RowSeparator = styled.div`
  width: 85%;
  height: 2px;
  border-bottom: 2px solid black;
  margin: 5px auto;
`;

export const StyledHeightBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : "24px")};
`;
