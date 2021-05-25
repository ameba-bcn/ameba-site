import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import MembershipForm from './../forms/MembershipForm';
import Review from './Review';
import PaymentForm from './../forms/PaymentForm';
import { checkoutCart, addToCart } from './../../redux/actions/cart';
import ExtendMembership from './ExtendMembership';

const mapStateToProps = state => {
    return {
        cart: state.cart.cart_data,
        isLoggedIn: state.auth.isLoggedIn,
        //   stripe: state.cart.stripe
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

function CheckoutMember(props) {
    const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false);
    const [paymentReady, setPaymentReady] = useState(false);
    const [viewState, setViewState] = useState("");
    const [displayError, setDisplayError] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cart_data = {} } = cart
    const { state = {} } = cart_data;
    const { has_member_profile = false, has_memberships = false } = state;

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Revisió', 'Dades de pagament'];

    const handleNext = () => {
        if (activeStep === 0) {
            dispatch(checkoutCart()).then(() => setActiveStep(activeStep + 1))
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
                return (
                    has_member_profile ?
                        // <CheckoutMemberPayment />
                        has_memberships ? <ExtendMembership />:<Review />
                        : <MembershipForm />
                );
            case 1:
                return <PaymentForm />;
            default:
                throw new Error('Unknown step');
        }
    }

    // if (viewState === "membershipPaymentPending") setPaymentReady(true)

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Fes-te Soci
                        </Typography>
                        {has_member_profile && <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>}
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Enrere
                                    </Button>
                                )}
                                {activeStep <= 1 && has_member_profile && (
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
        </div>
    )
}

export default connect(mapStateToProps)(CheckoutMember);