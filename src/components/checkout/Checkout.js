import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FreeCheckout from "./FreeCheckout";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import MembershipForm from "../forms/MembershipForm";
import Review from "./Review";
import PaymentForm from "../forms/PaymentForm";
import { checkoutCart, getCart } from "../../redux/actions/cart";
// import ExtendMembership from "./ExtendMembership";
import { isEmptyObject, isMemberCheckout } from "../../utils/utils";
import SubscriptionBox from "../profile/SubscriptionBox";
import "./Checkout.css";
import Button from "../button/Button";
import { getMemberProfile } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import MemberProfile from "../profile/MemberProfile";

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart_data,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

function Checkout(props) {
  const { errorMessage } = props;
  const dispatch = useDispatch();
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { isLoggedIn = false } = useSelector((state) => state.auth);
  const { state = {} } = cart_data;
  const { has_member_profile = false } = state || {};
  const mockedInputData = { dataRenovacio: "2021-07-16T12:30:00.000Z" };
  const { cart = {} } = props;
  const { total = "" } = cart;
  const isPaymentFree = total === "0.00 €";
  const [activeStep, setActiveStep] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { item_variants = [] } = cart;
  const hasMembershipInCart = isMemberCheckout(item_variants); // sacar del carro cuando esté en back

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
    if (activeStep === 0) {
      dispatch(checkoutCart())
        .then(() => setActiveStep(activeStep + 1))
        .catch((err) => {
          console.log("se viene error", err);
          setError(true);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContentMember = (step) => {
    switch (step) {
      case 0:
        return has_member_profile ? (
          <MemberProfile
            buttonDisabled={buttonDisabled}
            setButtonDisabled={setButtonDisabled}
            handleNext={handleNext}
          />
        ) : (
          <MembershipForm handleNext={handleNext} />
        );
      case 1:
        return (
          <>
            <Review />
            <SubscriptionBox date={mockedInputData} />
          </>
        );
      case 2:
        return <PaymentForm />;
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
    <div>
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
                  {activeStep < steps.length - 1 && has_member_profile && (
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
        {error && <div className="error-message">{errorMessage}</div>}
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps)(Checkout);
