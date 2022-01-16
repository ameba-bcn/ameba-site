import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAfterCheckout } from "../../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import Button from "../../button/Button";
import { getMemberProfile } from "../../../redux/actions/auth";
import ErrorBox from "../error/ErrorBox";
import PaymentStatus from "../../checkout/PaymentStatus";

function PaymentForm(props) {
  const dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // const handleChange = async (event) => {
  //   // Listen for changes in the CardElement
  //   // and display any errors as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost/summary-checkout",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (e.g., payment
      // details incomplete)
      setError(`Pagament no realitzat: ${error.message}`);
      setProcessing(false);
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      props.handleNext();
    }
  };

  // const handleSubmit = async (ev) => {
  //   ev.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //     },
  //   });

  //   if (payload.error) {
  //     setError(`Pagament no realitzat: ${payload.error.message}`);
  //     setProcessing(false);
  //   } else {
  //     setError(null);
  //     setProcessing(false);
  //     setSucceeded(true);
  //   }
  // };

  // if (succeeded) {
  //   dispatch(deleteCartAfterCheckout()).then(dispatch(getMemberProfile()));
  //   return <Redirect to="/summary-checkout" />;
  // }

  return (
    <div className="payment-root">
    <div className="payment-body">
        <form onSubmit={handleSubmit}>
          <PaymentElement options={cardStyle} />
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--solid"
            id="submit"
            disabled={!stripe}>
            {" "}
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Paga"
              )}
            </span>
          </Button>
          {/* Show error message to your customers */}
          {errorMessage && <div>{errorMessage}</div>}
        </form>
        {/* <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--solid"
            id="submit"
            disabled={processing || disabled || succeeded}
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Paga ara"
              )}
            </span>
          </Button>

          {error && <ErrorBox isError={true} message={error} className="result-message-box"/>}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Pagament realitzat amb èxit, comproba la teva compra a :
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresca la pàgina per a pagar un altre cop
          </p>
        </form> */}
      </div>
    </div>
  );
}

export default PaymentForm;
