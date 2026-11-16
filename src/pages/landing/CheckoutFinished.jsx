import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import StatusPanel from "../../components/status/StatusPanel";
import Button from "../../components/button/Button";
import useCartStore from "../../stores/useCartStore";

const CHECKOUT_STEP_KEY = "checkoutStep";
const PAYMENT_STEP = 2;

// Stripe vuelve aquí tras confirmPayment con `payment_intent_client_secret` y
// `redirect_status` en la URL (3DS, PayPal, Satispay… salen de la web). Un
// pago rechazado también vuelve aquí, así que no se puede dar por bueno: se
// consulta el PaymentIntent y, si no se ha cobrado, se ofrece reintentar con
// el mismo pago pendiente. Sin client_secret en la URL (checkout gratuito) es
// un éxito directo.
function mapStatus(status) {
  if (status === "succeeded") return "succeeded";
  if (status === "processing") return "processing";
  if (status === "canceled") return "canceled";
  return "failed";
}

async function resolvePaymentStatus(clientSecret, redirectStatus, stripePublic) {
  if (stripePublic) {
    try {
      const stripe = await loadStripe(stripePublic);
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      if (paymentIntent?.status) return mapStatus(paymentIntent.status);
    } catch {
      // Stripe.js no disponible: nos quedamos con lo que dice la URL.
    }
  }
  return mapStatus(redirectStatus);
}

function CheckoutFinished() {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const location = useLocation();
  const stripePublic = useCartStore(
    (state) => state.checkout?.checkout_stripe?.stripe_public,
  );
  const clearPendingPayment = useCartStore((state) => state.clearPendingPayment);
  const clearCart = useCartStore((state) => state.clearCart);

  const params = new URLSearchParams(location.search);
  const clientSecret = params.get("payment_intent_client_secret");
  const redirectStatus = params.get("redirect_status");

  const [status, setStatus] = useState(clientSecret ? "checking" : "succeeded");

  useEffect(() => {
    if (!clientSecret) return;
    let active = true;
    resolvePaymentStatus(clientSecret, redirectStatus, stripePublic).then(
      (result) => active && setStatus(result),
    );
    return () => {
      active = false;
    };
    // Solo al llegar: el pago pendiente del store se limpia más abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSecret, redirectStatus]);

  useEffect(() => {
    if (status === "succeeded" || status === "processing") {
      localStorage.removeItem(CHECKOUT_STEP_KEY);
      clearCart();
    } else if (status === "canceled") {
      clearPendingPayment();
    }
  }, [status, clearCart, clearPendingPayment]);

  const retry = () => {
    // Un pago rechazado sigue siendo reutilizable: se vuelve directo al paso
    // de pago. Uno cancelado ya no, así que se repasa la cesta y se pide
    // uno nuevo. Se descarta aquí también: el efecto de arriba puede no
    // haber corrido aún si el usuario pulsa nada más pintarse el botón.
    if (status === "canceled") clearPendingPayment();
    localStorage.setItem(
      CHECKOUT_STEP_KEY,
      status === "canceled" ? PAYMENT_STEP - 1 : PAYMENT_STEP,
    );
    navigate("/pagament");
  };

  const browseActions = (
    <>
      <Button
        buttonStyle="boton--back-orange--solid"
        buttonSize="boton--medium"
        hoverStyle="bg-cream"
        onClick={() => navigate("/")}
      >
        {t("checkoutFinished.cta-home")}
      </Button>
      <Button
        buttonStyle="boton--primary--solid"
        buttonSize="boton--medium"
        hoverStyle="bg-cream"
        onClick={() => navigate("/botiga")}
      >
        {t("checkoutFinished.cta-botiga")}
      </Button>
    </>
  );

  let panel;
  if (status === "checking") {
    panel = <StatusPanel loading />;
  } else if (status === "succeeded") {
    panel = (
      <StatusPanel
        tone="success"
        eyebrow={t("checkoutFinished.tag")}
        title={t("checkoutFinished.titol")}
        text={t("checkoutFinished.subtitol")}
        actions={browseActions}
      />
    );
  } else if (status === "processing") {
    panel = (
      <StatusPanel
        tone="success"
        eyebrow={t("checkoutFinished.processing-tag")}
        title={t("checkoutFinished.processing-titol")}
        text={t("checkoutFinished.processing-text")}
        actions={browseActions}
      />
    );
  } else {
    panel = (
      <StatusPanel
        tone="error"
        eyebrow={t("checkoutFinished.failed-tag")}
        title={t("checkoutFinished.failed-titol")}
        text={t("checkoutFinished.failed-text")}
        actions={
          <Button
            buttonStyle="boton--back-orange--solid"
            buttonSize="boton--medium"
            hoverStyle="bg-cream"
            onClick={retry}
          >
            {t("checkoutFinished.cta-retry")}
          </Button>
        }
      />
    );
  }

  return (
    <PageLayout section="status" centered>
      <PageMeta title={t("checkoutFinished.meta-title")} url="/resum-comanda" />
      {panel}
    </PageLayout>
  );
}

export default CheckoutFinished;
