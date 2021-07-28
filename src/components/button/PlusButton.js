import React from "react";
import "./PlusButton.css";

const STYLES = ["plus--ligth", "plus--obscure", "plus--red"];
const SIZES = ["plus--medium", "plus--big"];

export default function PlusButton(props) {
  const { onClick, plusStyle, plusSize } = props;
  const plusDefaultStyle = STYLES.includes(plusStyle) ? plusStyle : STYLES[0];
  const plusDefaultSize = SIZES.includes(plusSize) ? plusSize : SIZES[0];
  return (
    <div className="plusBox">
      <div
        className={`Plus ${plusDefaultStyle} ${plusDefaultSize}`}
        onClick={onClick}
      >
        +
      </div>
    </div>
  );
}
