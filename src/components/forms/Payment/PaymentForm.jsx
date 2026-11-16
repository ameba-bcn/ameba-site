import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import Button from "../../button/Button";
import notificationToast from "../../../utils/utils";

// `beforeSubmit` se pinta entre el formulario de Stripe y el botón: es donde
// va la aceptación de condiciones, que tiene que leerse justo antes de pagar y
// no al principio de la página, separada del CTA por toda la tarjeta.
// `onUnavailable` se llama si el pago pendiente ya no se puede usar (cancelado
// o el PaymentElement no carga), para que el checkout pida uno nuevo.
function PaymentForm({
  disabled = false,
  beforeSubmit = null,
  clientSecret = "",
  onUnavailable = null,
}) {
  const [processing, setProcessing] = useState(false);
  // Stripe lanza un IntegrationError si se confirma sin el PaymentElement
  // montado: el botón espera a `onReady` y se vuelve a bloquear si falla.
  const [elementReady, setElementReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // El pago pendiente se guarda en localStorage y puede reanudarse días
  // después: si ya se cobró se manda al resumen, y si se canceló se descarta.
  useEffect(() => {
    if (!stripe || !clientSecret) return;
    let active = true;
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent } = {}) => {
        if (!active || !paymentIntent) return;
        const { status } = paymentIntent;
        if (status === "succeeded" || status === "processing") {
          const query = new URLSearchParams({
            payment_intent_client_secret: clientSecret,
            redirect_status: status,
          });
          navigate(`/resum-comanda?${query}`);
        } else if (status === "canceled") {
          onUnavailable?.();
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [stripe, clientSecret]);

  const paymentElementOptions = {
    layout: "tabs",
  };

  const return_url = `${window.location.origin}/resum-comanda`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !elementReady) {
      return;
    }

    setProcessing(true);

    let error;
    try {
      ({ error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url,
        },
      }));
    } catch (integrationError) {
      error = integrationError;
    }

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
          <PaymentElement
            options={paymentElementOptions}
            onReady={() => setElementReady(true)}
            onLoadError={() => {
              setElementReady(false);
              onUnavailable?.();
            }}
          />
          {beforeSubmit}
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle="boton--back-orange--solid"
            id="submit"
            disabled={!stripe || !elementReady || processing || disabled}
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
