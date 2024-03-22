import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import "./PaymentForm.css";
import Button from "../../button/Button";
import { closeFullscreen } from "../../../store/actions/fullscreen";
import notificationToast from "../../../utils/utils";

function PaymentForm() {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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

  const currentURL = window.location.href.replace("checkout", "");

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${currentURL}summary-checkout`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (e.g., payment
      // details incomplete)
      setProcessing(false);
      notificationToast(error.message, "error");
      dispatch(closeFullscreen());
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setProcessing(false);
      dispatch(closeFullscreen());
    }
  };

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
            disabled={!stripe}
          >
            {" "}
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Paga"
              )}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
