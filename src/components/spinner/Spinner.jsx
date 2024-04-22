import React from "react";
import styled from "styled-components";

const StyledSpinnerFrame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: ${(props) => (props.height ? `${props.height}px` : "100px")};
  justify-content: center;
  align-items: center;
`;

const StyledSpinner = styled.div`
  position: relative;
  z-index: 999;
  margin: 0 auto;
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: show;

  &:before {
    content: "";
    display: flex;
    position: relative;
    background: radial-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8));
    background: -webkit-radial-gradient(
      rgba(20, 20, 20, 0.8),
      rgba(0, 0, 0, 0.8)
    );
  }

  &:not(:required) {
    /* hide "loading..." text */
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  &:not(:required):after {
    content: "";
    display: flex;
    font-size: 10px;
    width: 1em;
    height: 1em;
    /* margin-top: -0.5em; */
    -webkit-animation: spinner 150ms infinite linear;
    -moz-animation: spinner 150ms infinite linear;
    -ms-animation: spinner 150ms infinite linear;
    -o-animation: spinner 150ms infinite linear;
    animation: spinner 150ms infinite linear;
    border-radius: 0.5em;
    -webkit-box-shadow: ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 1.5em 0 0 0"
          : "var( --color-negro) 1.5em 0 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 1.1em 1.1em 0 0"
          : "var( --color-negro) 1.1em 1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 0 1.5em 0 0"
          : "var( --color-negro) 0 1.5em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.1em 1.1em 0 0"
          : "var( --color-negro) -1.1em 1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.5em 0 0 0"
          : "var( --color-negro) -1.5em 0 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.1em -1.1em 0 0"
          : "var( --color-negro) -1.1em -1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 0 -1.5em 0 0"
          : "var( --color-negro) 0 -1.5em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 1.1em -1.1em 0 0"
          : "var( --color-negro) 1.1em -1.1em 0 0"};
    box-shadow: ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 1.5em 0 0 0"
          : "var( --color-negro) 1.5em 0 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 1.1em 1.1em 0 0"
          : "var( --color-negro) 1.1em 1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 0 1.5em 0 0"
          : "var( --color-negro) 0 1.5em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.1em 1.1em 0 0"
          : "var( --color-negro) -1.1em 1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.5em 0 0 0"
          : "var( --color-negro) -1.5em 0 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) -1.1em -1.1em 0 0"
          : "var( --color-negro) -1.1em -1.1em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream) 0 -1.5em 0 0"
          : "var( --color-negro) 0 -1.5em 0 0"},
      ${(props) =>
        props.color === "white"
          ? "var( --color-cream)  1.1em -1.1em 0 0"
          : "var( --color-negro)  1.1em -1.1em 0 0"};
  }

  /* Animation */

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ height, color = "white" }) => {
  return (
    <StyledSpinnerFrame height={height}>
      <StyledSpinner className="loading" color={color}>
        Loading
      </StyledSpinner>
    </StyledSpinnerFrame>
  );
};

export default Spinner;
