import React, { useEffect, useState } from "react";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import Review from "./Review";
import { isMemberCheckout } from "../../utils/utils";
import "./Checkout.css";
import Button from "../button/Button";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import Stepper from "../stepper/Stepper";
import "./Checkout.style.css";
import Payment from "./Payment";
import { MOBILE_NORMAL, MOBILE_SMALL } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";
import useMediaQuery from "../../hooks/use-media-query";

function Checkout() {
  const closeFullscreen = useUIStore((state) => state.closeFullscreen);
  const [t] = useTranslation("translation");
  const { cart_data = {}, checkoutCart, checkoutPaymentCart, getCart } = useCartStore();
  const { isLoggedIn = false } = useAuthStore();
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const { total = "", item_variants = [], id = "" } = cart_data;
  const isPaymentFree = total === "0.00 €";
  const hasMembershipInCart = isMemberCheckout(item_variants); // sacar del carro cuando esté en back
  const [activeStep, setActiveStep] = useState(hasMembershipInCart ? 0 : 1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const userIsEditingData =
    buttonDisabled && activeStep === 0 && hasMembershipInCart;
  const steps =
    localStorage.getItem("i18nextLng") === "es"
      ? ["Datos personales", "Cesta", "Datos de pago"]
      : ["Dades personals", "Cistella", "Dades de pagament"];
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const isMinMobile = useMediaQuery(MOBILE_SMALL);

  useEffect(() => {
    getMemberProfile();
  }, [getMemberProfile]);
  if (!item_variants.length || !isLoggedIn) return <Navigate to="/" replace />;

  const handleNext = () => {
    if (activeStep === 1) {
      setLoading(true);
      checkoutCart()
        .then(() => !isPaymentFree && checkoutPaymentCart(id))
        .then(() => {
          setActiveStep(activeStep + 1);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
    isMobile && window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    isMobile && window.scrollTo(0, 0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="checkout-member-frame">
            {hasMembershipInCart ? (
              <MembershipFormLayout setButtonDisabled={setButtonDisabled} />
            ) : (
              <MembershipFormReadOnly isCheckout={true} />
            )}
          </div>
        );
      case 1:
        return (
          <>
            <Review />
          </>
        );
      case 2:
        return <Payment />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleClose = () => {
    closeFullscreen();
    getCart();
  };

  return (
    <div className="checkout-frame">
      <div className="checkout-box">
        <div className="checkout-title">{t("checkout.pagament")}</div>
        <div className="checkout-subtitle">{steps[activeStep]}</div>
        <Stepper arraySteps={steps} activeStep={activeStep} />
        <div className="checkout-content">{getStepContent(activeStep)}</div>
        {loading && <span className="spinner-border"></span>}
        <div className="checkout-buttons">
          {activeStep !== 0 &&
            (activeStep < 2 ? (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
                buttonStyle="boton--primary--solid"
                disabled={loading}
                onClick={handleBack}
              >
                {t("boto.enrere")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
                buttonStyle="boton--primary--solid"
                disabled={loading}
                onClick={() => handleClose()}
              >
                {t("modal.sortir")}
              </Button>
            ))}
          {activeStep < steps.length - 1 && !userIsEditingData && (
            <Button
              variant="contained"
              color="primary"
              buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
              buttonStyle="boton--primary--solid"
              disabled={loading}
              onClick={handleNext}
            >
              {t("boto.seguent")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
