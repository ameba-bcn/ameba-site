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
