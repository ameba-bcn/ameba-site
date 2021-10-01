import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { getMemberProfile } from "../../redux/actions/auth";
import { deleteCartAfterCheckout } from "../../redux/actions/cart";
import { Paragraph1 } from "./../../GlobalStyles.style";
import Button from "../button/Button";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";

export default function FreeCheckout() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const handleFinishPayment = () => {
    dispatch(deleteCartAfterCheckout())
      .then(() => {
        dispatch(getMemberProfile());
        setError(false);
        dispatch(clearMessage());
      })
      .catch(() => {
        setError(true);
      });
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/summary-checkout" />;

  return (
    <div className="freeCheckout-box">
      <Paragraph1>
        El procediment de compra no suposa cap càrreg per tant no cal realitzar
        pagament.
      </Paragraph1>
      {error && <ErrorBox isError={error} />}
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
