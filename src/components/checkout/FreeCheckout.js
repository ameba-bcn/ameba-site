import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { getMemberProfile } from "../../redux/actions/auth";
import { deleteCartAfterCheckout } from "../../redux/actions/cart";
import { Paragraph1 } from "./../../GlobalStyles.style";
import Button from "../button/Button";
import ErrorBox from "../forms/error/ErrorBox";

export default function FreeCheckout() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleFinishPayment = () => {
    dispatch(deleteCartAfterCheckout())
      .then(dispatch(getMemberProfile()))
      .catch((err) => {
        setError(true);
        setMessage(err);
      });
    setRedirect(true);
    setMessage('');
  };

  if (redirect) return <Redirect to="/summary-checkout" />;

  return (
    <div className="freeCheckout-box">
      <Paragraph1>
        El procediment de compra no suposa cap càrreg per tant no cal realitzar
        pagament.
      </Paragraph1>
      {!!message.length && <ErrorBox isError={error} message />}
      <Button
        variant="contained"
        color="primary"
        buttonSize="boton--medium"
        buttonStyle="boton--primary--solid"
        onClick={handleFinishPayment}
      >
        Finalitza
      </Button>
    </div>
  );
}
