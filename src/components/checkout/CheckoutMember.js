import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import MembershipForm from "./../forms/MembershipForm";
import Review from "./Review";
import PaymentForm from "./../forms/PaymentForm";
import { checkoutCart, getCart } from "./../../redux/actions/cart";
import ExtendMembership from "./ExtendMembership";
import { isEmptyObject } from "../../utils/utils";
import SubscriptionBox from "../profile/SubscriptionBox";
import "./CheckoutMember.css";

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart_data,
    isLoggedIn: state.auth.isLoggedIn,
    //   stripe: state.cart.stripe
  };
};

function CheckoutMember(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn = false } = auth;
  const { cart_data = {} } = cart;
  const { state = {} } = cart_data;
  const { has_member_profile = false, has_memberships = false } = state || {};
  const mockedInputData = { dataRenovacio: "2021-07-16T12:30:00.000Z" };

  const [activeStep, setActiveStep] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const steps = [
    "Dades personals",
    "Estat de la subscripció",
    "Dades de pagament",
  ];

  if (isEmptyObject(cart_data) && isLoggedIn) {
    dispatch(getCart());
  }

  const handleNext = () => {
    if (activeStep === 0) {
      dispatch(checkoutCart()).then(() => setActiveStep(activeStep + 1));
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return has_member_profile && isLoggedIn ? (
          // <CheckoutMemberPayment />
          has_memberships ? (
            <ExtendMembership
              buttonDisabled={buttonDisabled}
              setButtonDisabled={setButtonDisabled}
            />
          ) : (
            <Review />
          )
        ) : (
          <MembershipForm />
        );
      case 1:
        return <SubscriptionBox date={mockedInputData} />;
      case 2:
        return <PaymentForm />;
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
            {has_member_profile && (
              <Stepper
                activeStep={activeStep}
                className={"member-form-stepper"}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={"checkout-member-form-buttons"}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    className={"checkout-member-form-button"}
                  >
                    Enrere
                  </Button>
                )}
                {activeStep < 1 && has_member_profile && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={buttonDisabled}
                    className={"checkout-member-form-button"}
                  >
                    Següent
                  </Button>
                )}
              </div>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps)(CheckoutMember);
