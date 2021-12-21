import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import Review from "./Review";
import { checkoutCart } from "../../redux/actions/cart";
import { isMemberCheckout } from "../../utils/utils";
import "./Checkout.css";
import Button from "../button/Button";
import { getMemberProfile } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import Stepper from "../stepper/Stepper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

function Checkout() {
  const dispatch = useDispatch();
  const { cart_data = {}, checkout = {} } = useSelector((state) => state.cart);
  const { isLoggedIn = false } = useSelector((state) => state.auth);
  const { total = "", item_variants = [] } = cart_data;
  const isPaymentFree = checkout ? checkout.amount === 0 : total === "0.00 €";
  const hasMembershipInCart = isMemberCheckout(item_variants); // sacar del carro cuando esté en back
  const [activeStep, setActiveStep] = useState(hasMembershipInCart ? 0 : 1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(false);
  const userIsEditingData =
    buttonDisabled && activeStep === 0 && hasMembershipInCart;
  const steps = ["Dades personals", "Cistella", "Dades de pagament"];
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const isMinMobile = useMediaQuery(MOBILE_SMALL);
  const promise = loadStripe(
    "pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep"
  );

  useEffect(() => {
    dispatch(getMemberProfile());
  }, [dispatch]);

  if (!item_variants.length || !isLoggedIn) return <Redirect to="/" />;

  const handleNext = () => {
    if (activeStep === 1) {
      dispatch(checkoutCart())
        .then(() => {
          setActiveStep(activeStep + 1);
          setError(false);
          dispatch(clearMessage());
        })
        .catch(() => {
          setError(true);
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
                handleNext={handleNext}
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
    <Elements stripe={promise}>
      <CheckoutFrame>
        <CheckoutBox>
          <CheckoutTitle>Pagament</CheckoutTitle>
          <CheckoutSubtitle>{steps[activeStep]}</CheckoutSubtitle>
          <Stepper arraySteps={steps} activeStep={activeStep} />
          <CheckoutContent>{getStepContent(activeStep)}</CheckoutContent>
          {error && <ErrorBox isError={error} />}
          <CheckoutButtons>
            {activeStep !== 0 && (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
                buttonStyle="boton--primary--solid"
                onClick={handleBack}
              >
                Enrere
              </Button>
            )}
            {activeStep < steps.length - 1 && !userIsEditingData && (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
                buttonStyle="boton--primary--solid"
                onClick={handleNext}
              >
                Següent pas
              </Button>
            )}
          </CheckoutButtons>
        </CheckoutBox>
      </CheckoutFrame>
    </Elements>
  );
}

export default Checkout;
