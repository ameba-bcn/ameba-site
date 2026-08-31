import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import Button from "../../button/Button";
import notificationToast from "../../../utils/utils";

function PaymentForm({ disabled = false }) {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const paymentElementOptions = {
    layout: "tabs",
  };

  const return_url = `${window.location.origin}/summary-checkout`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url,
      },
    });

    if (error) {
      // Show error but keep the form open so the user can retry
      setProcessing(false);
      notificationToast(error.message, "error");
    }
    // If no error, Stripe redirects automatically to return_url.
    // No need to handle the else case here.
  };

  return (
    <div className="payment-root">
      <div className="payment-body">
        <form onSubmit={handleSubmit}>
          <PaymentElement options={paymentElementOptions} />
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle="boton--back-orange--solid"
            id="submit"
            disabled={!stripe || processing || disabled}
            loading={processing}
          >
            <span id="button-text">Paga</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
