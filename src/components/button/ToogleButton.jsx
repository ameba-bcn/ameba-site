import React from "react";
import styled from "styled-components";
import Button from "./Button";

export const StyledToogleButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
  button {
    border-radius: 0px 25px 25px 0px;
    &:first-of-type {
      border-radius: 25px 0px 0px 25px;
    }
  }
  button:hover {
    transform: translateY(0px) !important;
  }
`;

const ToogleButton = (props) => {
  const {
    loading = false,
    text1 = "",
    text2 = "",
    firstActive = false,
    setFirstActive,
    id,
  } = props;

  return (
    <StyledToogleButton id={id}>
      <Button
        variant="contained"
        color="primary"
        buttonSize="boton--small"
        buttonStyle={`${
          firstActive ? "boton--back-orange--solid" : "boton--primary--outline"
        }`}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          setFirstActive(true);
        }}
      >
        {text1}
      </Button>
      <Button
        variant="contained"
        color="primary"
        buttonSize="boton--small"
        buttonStyle={`${
          firstActive ? "boton--primary--outline" : "boton--back-orange--solid"
        }`}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          setFirstActive(false);
        }}
      >
        {text2}
      </Button>
    </StyledToogleButton>
  );
};

export default ToogleButton;
