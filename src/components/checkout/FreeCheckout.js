import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getMemberProfile } from "../../redux/actions/auth";
import { checkoutPaymentCart, getCart } from "../../redux/actions/cart";
import Button from "../button/Button";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";
import { useTranslation } from "react-i18next";

const StyledFreeCheckoutParagraph = styled.div`
  font-size: 24px;
`;

const StyledFreeCheckout = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    button {
      padding: 10px 50px;
    }
`;

export default function FreeCheckout() {
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { id = "" } = cart_data;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const handleFinishPayment = () => {
    dispatch(checkoutPaymentCart(id))
      .then(() => {
        dispatch(getMemberProfile());
        setError(false);
        dispatch(clearMessage());
        dispatch(getCart());
      })
      .catch(() => {
        setError(true);
      });
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/summary-checkout" />;

  return (
    <StyledFreeCheckout>
      <StyledFreeCheckoutParagraph>
        {t("checkout.pagament-gratis")}
      </StyledFreeCheckoutParagraph>
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
    </StyledFreeCheckout>
  );
}
