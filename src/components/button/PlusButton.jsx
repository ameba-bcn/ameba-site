import React from "react";
import "./StyledPlusButton.css";
import Icon from "../ui/Icon";

const STYLES = ["plus--ligth", "plus--obscure", "plus--red"];
const SIZES = ["plus--small", "plus--medium", "plus--big"];

const colorClassMap = {
  "plus--ligth": "plus-button--light",
  "plus--obscure": "plus-button--obscure",
  "plus--red": "plus-button--red",
};

const sizeClassMap = {
  "plus--small": "plus-button--small",
  "plus--medium": "plus-button--medium",
  "plus--big": "plus-button--big",
};

export default function PlusButton(props) {
  const { onClick, plusStyle, plusSize } = props;
  const plusDefaultStyle = STYLES.includes(plusStyle) ? plusStyle : STYLES[0];
  const plusDefaultSize = SIZES.includes(plusSize) ? plusSize : SIZES[0];

  return (
    <div className="plus-button-box">
      <div
        className={`plus-button ${sizeClassMap[plusDefaultSize]} ${colorClassMap[plusDefaultStyle]}`}
        onClick={onClick}
      >
        <Icon icon="plus" />
      </div>
    </div>
  );
}
