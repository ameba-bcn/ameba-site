import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";

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
  const closeFullscreen = useUIStore((state) => state.closeFullscreen);
  const [t] = useTranslation("translation");
  const { cart_data = {}, checkoutPaymentCart, getCart } = useCartStore();
  const { id = "" } = cart_data;
  const [redirect, setRedirect] = useState(false);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const handleFinishPayment = () => {
    checkoutPaymentCart(id).then(() => {
      getMemberProfile();
      getCart();
      closeFullscreen();
    });
    setRedirect(true);
  };

  if (redirect) return <Navigate to="/summary-checkout" replace />;

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
