import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { deleteCartAfterCheckout } from './../../redux/actions/cart';
import { Redirect } from 'react-router-dom';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './PaymentForm.css'

const mapStateToProps = state => {
  return {
    checkout: state.cart.checkout
  };
};

function PaymentForm(props) {
  const dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  console.log("client secret", props)

  useEffect(() => {
    console.log("client secret", props.checkout.checkout.client_secret)
    setClientSecret(props.checkout.checkout.client_secret);
  }, [props.checkout.checkout.client_secret]);

  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Pagament no realitzat: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      
    }
  };

  if (succeeded) {
    dispatch(deleteCartAfterCheckout())
    return <Redirect to='/summary-checkout' />;
}

  return (
    <div className="payment-root">
      <div className="payment-body">
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
          <button
            disabled={processing || disabled || succeeded}
            id="submit"
            className="payment-button"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Pagament realitzat amb èxit, comproba la teva compra a :
        <a
              href={`https://dashboard.stripe.com/test/payments`}
            >
              {" "}
          Stripe dashboard.
        </a> Refresca la pàgina per a pagar un altre cop
      </p>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PaymentForm);