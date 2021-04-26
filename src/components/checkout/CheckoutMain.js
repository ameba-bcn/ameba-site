import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { checkoutCart } from './../../redux/actions/cart';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './../forms/PaymentForm';
import Review from './Review';
import Login from './../../redux/components/Login';
import SuccesfullLogin from './../../redux/components/SuccesfullLogin';

const mapStateToProps = state => {
  return {
    cart: state.cart.cart_data,
    isLoggedIn: state.auth.isLoggedIn,
    stripe: state.cart.stripe,
    user_data: state.auth.user_data
  };
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function CheckoutMain(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { username = "", email = "" } = props.user_data
  const [activeStep, setActiveStep] = React.useState(props.isLoggedIn ? 1 : 0);
  const [autoStep, setAutoStep] = React.useState(true);
  const steps = ['Log/Registre', 'Revisió', 'Dades de pagament'];
  const [viewState, setViewState] = useState("login");

  const handleNext = () => {
    if (activeStep === 0 && !props.isLoggedIn) {
      console.log("Error, user not logged")
    }
    else {
      if (activeStep === 1) {
        dispatch(checkoutCart())
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    console.log("Handle Back", activeStep)
    setActiveStep(activeStep - 1);
    setAutoStep(false)
  };

  if (props.isLoggedIn && activeStep === 0 && autoStep) {
    handleNext();
    setAutoStep(false)
  }

  if (props.stripe && activeStep === 1){
    setActiveStep(activeStep + 1);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return props.isLoggedIn ? <SuccesfullLogin nom={username} email={email} /> : <Login isCheckout={true} viewState={viewState} setViewState={setViewState}/>;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error('Unknown step');
    }
  }

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
                    <Button onClick={handleBack} className={classes.button}>
                      Enrere
                    </Button>
                  )}
                  {activeStep <= 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Següent
                  </Button>
                    )}
                </div>
              </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(CheckoutMain);