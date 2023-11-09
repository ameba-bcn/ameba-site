import styled from "styled-components";

export const BreadcrumsStyled = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Bebas Neue";
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 20px 0px;
  span {
    cursor: pointer;
  }

  span.active {
    text-decoration: underline;
  }
`;
