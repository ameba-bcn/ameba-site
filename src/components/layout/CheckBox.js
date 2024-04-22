import React from "react";
import styled from "styled-components";

const StyledCheckBox = styled.div`
  display: flex;
  justify-content: center;
  input {
    margin-top: -14px;
    :not(.disabled) {
      cursor: pointer;
    }
  }
  .checkbox-wrapper {
    --borderColor: #000;
    --borderWidth: 0.125em;
  }

  .checkbox-wrapper label {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }

  .checkbox-wrapper input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    background: #fff;
    font-size: 1.8em;
    border-radius: 0px;
    display: inline-block;
    border: var(--borderWidth) solid var(--borderColor);
    width: 1em;
    height: 1em;
    position: relative;
  }
  .checkbox-wrapper input[type="checkbox"]:before,
  .checkbox-wrapper input[type="checkbox"]:after {
    content: "";
    position: absolute;
    background: var(--borderColor);
    width: calc(var(--borderWidth) * 3);
    height: var(--borderWidth);
    top: 50%;
    left: 10%;
    transform-origin: left center;
  }
  .checkbox-wrapper input[type="checkbox"]:before {
    transform: rotate(45deg)
      translate(calc(var(--borderWidth) / -2), calc(var(--borderWidth) / -2))
      scaleX(0);
    transition: transform 200ms ease-in 200ms;
  }
  .checkbox-wrapper input[type="checkbox"]:after {
    width: calc(var(--borderWidth) * 5);
    transform: rotate(-45deg) translateY(calc(var(--borderWidth) * 2)) scaleX(0);
    transform-origin: left center;
    transition: transform 200ms ease-in;
  }
  .checkbox-wrapper input[type="checkbox"]:checked:before {
    transform: rotate(45deg)
      translate(calc(var(--borderWidth) / -2), calc(var(--borderWidth) / -2))
      scaleX(1);
    transition: transform 200ms ease-in;
  }
  .checkbox-wrapper input[type="checkbox"]:checked:after {
    width: calc(var(--borderWidth) * 5);
    transform: rotate(-45deg) translateY(calc(var(--borderWidth) * 2)) scaleX(1);
    transition: transform 200ms ease-out 200ms;
  }
  .checkbox-wrapper input[type="checkbox"]:focus {
    outline: calc(var(--borderWidth) / 2) dotted rgba(0, 0, 0, 0.25);
  }
  span {
    text-transform: uppercase;
    font-family: "Bebas Neue";
    font-size: 32px;
    width: 100%;
    height: 100%;
    margin-left: 4px;
  }
`;

const CheckBox = ({ label = "", checked, onChange, disabled = false }) => (
  <StyledCheckBox>
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onClick={() => onChange(checked)}
          disabled={disabled}
          onChange={() => {}}
        />
        <span className="checkbox"></span>
        <span>{label}</span>
      </label>
    </div>
  </StyledCheckBox>
);

export default CheckBox;
