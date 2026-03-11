import React, { useState } from "react";
import "./FreeCheckout.css";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";

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
    <div className="free-checkout">
      <div className="free-checkout__paragraph">
        {t("checkout.pagament-gratis")}
      </div>
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
