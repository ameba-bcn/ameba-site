import React, { useState } from "react";
import styled from "styled-components";
import PlusButton from "../button/PlusButton";

export const PlusBox = styled.div`
  & > div {
    margin: 10px 0px;
  }
`;

export default function CollapsableTextDiv(props) {
  const { text = "" } = props;
  const maxLength = 180;
  const minimizedText = text.substring(0, maxLength) + "...";
  const isLargeText = text.length > maxLength;
  const [open, setOpen] = useState(false);

  return open || !isLargeText ? (
    <>{text}</>
  ) : (
    <PlusBox>
      {minimizedText}
      <PlusButton
        plusStyle="plus--ligth"
        plusSize="plus--small"
        onClick={() => setOpen(true)}
      />
    </PlusBox>
  );
}
