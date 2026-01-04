import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import LettersMove from "../../components/layout/LettersMove";
import { radioDublabLink } from "../../utils/constants";
import notificationToast from "../../utils/utils";

function CheckoutFinished() {
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState("processing");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Check if we have a payment_intent or payment_intent_client_secret in the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      // Retrieve the PaymentIntent to check its status
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setPaymentStatus("succeeded");
            break;
          case "processing":
            setPaymentStatus("processing");
            break;
          case "requires_payment_method":
            setPaymentStatus("failed");
            notificationToast(
              "El pago ha fallado. Por favor, intenta con otro método de pago.",
              "error"
            );
            break;
          default:
            setPaymentStatus("unknown");
            break;
        }
      }).catch((error) => {
        console.error("Error retrieving payment intent:", error);
        setPaymentStatus("error");
        notificationToast("Error al verificar el pago", "error");
      });
    } else {
      // No payment_intent_client_secret means this is a direct landing (free checkout or other)
      setPaymentStatus("succeeded");
    }
  }, [stripe]);

  if (paymentStatus === "processing") {
    return (
      <>
        <div className="full-height-msg">
          <div className="single-msg">
            Processant el teu pagament...
            <br />
            Si us plau, espera
          </div>
        </div>
        <LettersMove
          className="lettersMoveDiv"
          sentence="AMEBA RADIO @ dublab"
          link={radioDublabLink}
          color="#EB5E3E"
        />
      </>
    );
  }

  if (paymentStatus === "failed" || paymentStatus === "error") {
    return (
      <>
        <div className="full-height-msg">
          <div className="single-msg">
            Error en el pagament
            <br />
            Si us plau, torna-ho a intentar
          </div>
        </div>
        <LettersMove
          className="lettersMoveDiv"
          sentence="AMEBA RADIO @ dublab"
          link={radioDublabLink}
          color="#EB5E3E"
        />
      </>
    );
  }

  return (
    <>
      <div className="full-height-msg">
        <div className="single-msg">
          GRÀCIES!
          <br />
          Hem rebut la teva comanda
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#EB5E3E"
      />
    </>
  );
}

export default CheckoutFinished;
