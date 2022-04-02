import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { StyledPlusButton, StyledPlusButtonBox } from "./StyledPlusButton";

const STYLES = ["plus--ligth", "plus--obscure", "plus--red"];
const SIZES = ["plus--small", "plus--medium", "plus--big"];

export default function PlusButton(props) {
  const { onClick, plusStyle, plusSize } = props;
  const plusDefaultStyle = STYLES.includes(plusStyle) ? plusStyle : STYLES[0];
  const plusDefaultSize = SIZES.includes(plusSize) ? plusSize : SIZES[0];

  return (
    <StyledPlusButtonBox>
      <div onClick={onClick}>
        <StyledPlusButton size={plusDefaultSize} colorStyle={plusDefaultStyle}>
          <AddIcon />
        </StyledPlusButton>
      </div>
    </StyledPlusButtonBox>
  );
}
