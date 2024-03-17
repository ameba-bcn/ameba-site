import styled from "styled-components";

export const StyledHeightBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : "24px")};
`;

export const StyledLink = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  color: #1d1d1b !important;
  margin-top: 12px;
  font-weight: ${(props) => (props.bold ? 600 : 300)};

  a {
    text-decoration: none;
    color: #1d1d1b !important;
  }

  &:hover {
    text-decoration: underline !important;
  }
`;
