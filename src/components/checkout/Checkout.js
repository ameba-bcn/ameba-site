import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FreeCheckout from "./FreeCheckout";
import { useDispatch, useSelector } from "react-redux";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import Review from "./Review";
import PaymentForm from "../forms/PaymentForm";
import { checkoutCart, getCart } from "../../redux/actions/cart";
import { isEmptyObject, isMemberCheckout } from "../../utils/utils";
import SubscriptionBox from "../profile/SubscriptionBox";
import "./Checkout.css";
import Button from "../button/Button";
import { getMemberProfile } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import ErrorBox from "../forms/error/ErrorBox";
import { clearMessage } from "../../redux/actions/message";

function Checkout() {
  const dispatch = useDispatch();
  const { cart_data = {}, checkout = {} } = useSelector((state) => state.cart);
  const { isLoggedIn = false } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const mockedInputData = { dataRenovacio: "2021-07-16T12:30:00.000Z" };
  const { total = "", item_variants = [] } = cart_data;
  const isPaymentFree = checkout ? checkout.amount === 0 : total === "0.00 €";
  const [activeStep, setActiveStep] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(false);
  const hasMembershipInCart = isMemberCheckout(item_variants); // sacar del carro cuando esté en back
  const userIsEditingData =
    buttonDisabled && activeStep === 0 && hasMembershipInCart;
  const steps = hasMembershipInCart
    ? ["Dades personals", "Estat de la subscripció", "Dades de pagament"]
    : ["Revisió", "Dades de pagament"];

  useEffect(() => {
    dispatch(getMemberProfile());
  }, []);

  if (isEmptyObject(cart_data) && isLoggedIn) {
    dispatch(getCart());
  }

  if (!item_variants.length) return <Redirect to="/" />;

  const handleNext = () => {
    setError(false);
    if (
      (hasMembershipInCart && activeStep === 1) ||
      (!hasMembershipInCart && activeStep === 0)
    ) {
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
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError(false);
  };

  const getStepContentMember = (step) => {
    switch (step) {
      case 0:
        return (
          <MembershipFormLayout
            handleNext={handleNext}
            setButtonDisabled={setButtonDisabled}
          />
        );
      case 1:
        return (
          <>
            <Review />
            <SubscriptionBox date={mockedInputData} isCheckout={true} />
          </>
        );
      case 2:
        return isPaymentFree ? <FreeCheckout /> : <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  };

  const getStepContentProduct = (step) => {
    switch (step) {
      case 0:
        return <Review />;
      case 1:
        return isPaymentFree ? <FreeCheckout /> : <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={"checkout-member-form"}>
        <Paper className={"checkout-member-form-paper"}>
          <div className="logTitle">Fes-te Soci</div>
          <Stepper activeStep={activeStep} className={"member-form-stepper"}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {hasMembershipInCart
              ? getStepContentMember(activeStep)
              : getStepContentProduct(activeStep)}
            {!!message.length && <ErrorBox isError={error} />}
            <div className={"checkout-member-form-buttons"}>
              <div>
                {activeStep !== 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize="boton--medium"
                    buttonStyle="boton--primary--solid"
                    onClick={handleBack}
                  >
                    Enrere
                  </Button>
                )}
              </div>
              <div>
                {activeStep < steps.length - 1 && !userIsEditingData && (
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize="boton--medium"
                    buttonStyle="boton--primary--solid"
                    onClick={handleNext}
                  >
                    Següent
                  </Button>
                )}
              </div>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Checkout;
