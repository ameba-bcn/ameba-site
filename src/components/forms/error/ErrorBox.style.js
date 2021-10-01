import styled from "styled-components";

export const ErrorDisclaimerBox = styled.div`
  z-index: 0;
`;

export const ErrorMessage = styled.div`
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #1d1d1b;
  ${(props) =>
    props.isError &&
    `  
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
`}
`;
