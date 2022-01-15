import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { getMemberProfile } from "../../redux/actions/auth";
import { deleteCartAfterCheckout } from "../../redux/actions/cart";
import Button from "../button/Button";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";
import { useTranslation } from "react-i18next";

export default function FreeCheckout() {
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
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
      <p>
        {t("checkout.pagament-gratis")}
      </p>
      {error && <ErrorBox isError={error} />}
      <Button
        variant="contained"
        color="primary"
        buttonSize="boton--medium"
        buttonStyle="boton--primary--solid"
        onClick={handleFinishPayment}
      >
        {t("boto.finalitza")}
      </Button>
    </div>
  );
}
