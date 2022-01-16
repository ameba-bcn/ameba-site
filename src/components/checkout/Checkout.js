import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import Review from "./Review";
import { checkoutCart, checkoutPaymentCart } from "../../redux/actions/cart";
import { isMemberCheckout } from "../../utils/utils";
import "./Checkout.css";
import Button from "../button/Button";
import { getMemberProfile } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import Stepper from "../stepper/Stepper";
import {
  CheckoutBox,
  CheckoutButtons,
  CheckoutContent,
  CheckoutFrame,
  CheckoutMemberFrame,
  CheckoutSubtitle,
  CheckoutTitle,
} from "./Checkout.style";
import Payment from "./Payment";
import { useMediaQuery } from "@material-ui/core";
import { MOBILE_NORMAL, MOBILE_SMALL } from "../../utils/constants";
import { useTranslation } from "react-i18next";

function Checkout() {
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const { cart_data = {}, checkout = {} } = useSelector((state) => state.cart);
  const { isLoggedIn = false } = useSelector((state) => state.auth);
  const { total = "", item_variants = [], id=""} = cart_data;
  const isPaymentFree = checkout ? checkout.amount === 0 : total === "0.00 €";
  const hasMembershipInCart = isMemberCheckout(item_variants); // sacar del carro cuando esté en back
  const [activeStep, setActiveStep] = useState(hasMembershipInCart ? 0 : 1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(false);
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
    dispatch(getMemberProfile());
  }, [dispatch]);

  if (!item_variants.length || !isLoggedIn) return <Redirect to="/" />;

  const handleNext = () => {
    if (activeStep === 1) {
      setLoading(true)
      dispatch(checkoutCart())
       .then(()=> !isPaymentFree && dispatch(checkoutPaymentCart(id)))
        .then(() => {
          setActiveStep(activeStep + 1);
          setError(false);
          dispatch(clearMessage());
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
    isMobile && window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError(false);
    isMobile && window.scrollTo(0, 0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CheckoutMemberFrame>
            {hasMembershipInCart ? (
              <MembershipFormLayout
                setButtonDisabled={setButtonDisabled}
              />
            ) : (
              <MembershipFormReadOnly isCheckout={true} />
            )}
          </CheckoutMemberFrame>
        );
      case 1:
        return (
          <>
            <Review setError={setError} error={error} />
          </>
        );
      case 2:
        return <Payment isPaymentFree={isPaymentFree} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
      <CheckoutFrame>
        <CheckoutBox>
          <CheckoutTitle>{t("checkout.pagament")}</CheckoutTitle>
          <CheckoutSubtitle>{steps[activeStep]}</CheckoutSubtitle>
          <Stepper arraySteps={steps} activeStep={activeStep} />
          <CheckoutContent>{getStepContent(activeStep)}</CheckoutContent>
          {error && <ErrorBox isError={error} />}
          {loading && <span className="spinner-border"></span> }
          <CheckoutButtons>
            {activeStep !== 0 && (
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
            )}
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
          </CheckoutButtons>
        </CheckoutBox>
      </CheckoutFrame>
  );
}

export default Checkout;
