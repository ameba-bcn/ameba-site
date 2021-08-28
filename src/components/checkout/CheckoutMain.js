import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { checkoutCart } from "./../../redux/actions/cart";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import PaymentForm from "./../forms/PaymentForm";
import Review from "./Review";
import FreeCheckout from "./FreeCheckout";
import Button from "./../button/Button";

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart_data,
    isLoggedIn: state.auth.isLoggedIn,
    stripe: state.cart.stripe,
    user_data: state.auth.user_data,
    errorMessage: state.message.message,
  };
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function CheckoutMain(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState(false);
  const steps = ["Revisió", "Dades de pagament"];
  const { cart = {}, errorMessage } = props;
  const { total = "" } = cart;
  const isPaymentFree = total === "0.00 €";

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

  const getStepContent = (step) => {
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
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
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
              {activeStep < 1 && (
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
            {error && <div className="error-message">{errorMessage}</div>}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(CheckoutMain);
