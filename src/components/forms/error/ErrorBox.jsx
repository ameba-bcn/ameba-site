import React from "react";
import { useSelector } from "react-redux";
import { ErrorDisclaimerBox, ErrorMessage } from "./ErrorBox.style";

export default function ErrorBox(props) {
  const { message: messageByProps, isError = false } = props;
  const { message } = useSelector((state) => state.message);

  return (
    <ErrorDisclaimerBox>
      <ErrorMessage isError={isError} role="alert">
        {messageByProps ? messageByProps : message}
      </ErrorMessage>
    </ErrorDisclaimerBox>
  );
}
