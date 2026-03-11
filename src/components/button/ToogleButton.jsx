import React from "react";
import "./ToogleButton.css";
import Button from "./Button";

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
    <div className="toogle-button" id={id}>
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
    </div>
  );
};

export default ToogleButton;
