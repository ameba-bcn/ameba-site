import React from "react";
import { StyledPlusButton, StyledPlusButtonBox } from "./StyledPlusButton";
import Icon from "../ui/Icon";

const STYLES = ["plus--ligth", "plus--obscure", "plus--red"];
const SIZES = ["plus--small", "plus--medium", "plus--big"];

export default function PlusButton(props) {
  const { onClick, plusStyle, plusSize } = props;
  const plusDefaultStyle = STYLES.includes(plusStyle) ? plusStyle : STYLES[0];
  const plusDefaultSize = SIZES.includes(plusSize) ? plusSize : SIZES[0];

  return (
    <StyledPlusButtonBox>
      <StyledPlusButton
        size={plusDefaultSize}
        colorStyle={plusDefaultStyle}
        onClick={onClick}
      >
        <Icon icon="plus" />
      </StyledPlusButton>
    </StyledPlusButtonBox>
  );
}
