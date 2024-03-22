import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getMemberProfile } from "../../store/actions/auth";
import { checkoutPaymentCart, getCart } from "../../store/actions/cart";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import { closeFullscreen } from "../../store/actions/fullscreen";

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
  const handleFinishPayment = () => {
    dispatch(checkoutPaymentCart(id)).then(() => {
      dispatch(getMemberProfile());
      dispatch(getCart());
      dispatch(closeFullscreen());
    });
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/summary-checkout" />;

  return (
    <StyledFreeCheckout>
      <StyledFreeCheckoutParagraph>
        {t("checkout.pagament-gratis")}
      </StyledFreeCheckoutParagraph>
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
