import styled from "styled-components";

export const ErrorDisclaimerBox = styled.div`
  z-index: 0;
`;

export const ErrorMessage = styled.div`
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  /* border-radius: 0.25rem; */
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
  ${(props) =>
    props.isError &&
    `color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb; `}
`;
