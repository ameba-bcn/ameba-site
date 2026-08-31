import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import Review from "./Review";
import Payment from "./Payment";
import CheckoutSummary from "./CheckoutSummary";
import Button from "../button/Button";
import { isMemberCheckout } from "../../utils/utils";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import useMediaQuery from "../../hooks/use-media-query";
import { MOBILE_NORMAL } from "../../utils/constants";
import "./Checkout.style.css";

const CHECKOUT_STEP_KEY = "checkoutStep";

function CheckoutSection({
  stepNumber,
  title,
  isActive,
  isCompleted,
  onHeaderClick,
  children,
}) {
  const [t] = useTranslation("translation");
  const stateClass = isActive
    ? "checkout-section--active"
    : isCompleted
      ? "checkout-section--completed"
      : "checkout-section--disabled";

  const handleClick = () => {
    if (isCompleted && onHeaderClick) {
      onHeaderClick();
    }
  };

  return (
    <section className={`checkout-section ${stateClass}`}>
      <button
        type="button"
        className="checkout-section__header"
        onClick={handleClick}
        aria-expanded={isActive}
      >
        <span className="checkout-section__header-left">
          <span className="checkout-section__number">{stepNumber}</span>
          <span className="checkout-section__title">{title}</span>
        </span>
        {isCompleted && (
          <span className="checkout-section__hint">
            {t("checkout.editar")} &#10003;
          </span>
        )}
      </button>
      <div className="checkout-section__body">
        <div className="checkout-section__content">{children}</div>
      </div>
    </section>
  );
}

function Checkout() {
  const [t] = useTranslation("translation");
  const { cart_data = {}, checkoutCart, checkoutPaymentCart } = useCartStore();
  const { isLoggedIn = false, user_data = {} } = useAuthStore();
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const { total = "", item_variants = [], id = "" } = cart_data;
  const isPaymentFree = total === "0.00 €";
  const hasMembershipInCart = isMemberCheckout(item_variants);
  const firstStep = hasMembershipInCart ? 0 : 1;

  const getSavedStep = () => {
    const saved = parseInt(localStorage.getItem(CHECKOUT_STEP_KEY));
    if (isNaN(saved)) return firstStep;
    if (!hasMembershipInCart && saved === 0) return 1;
    if (hasMembershipInCart && !user_data?.member) return 0;
    return saved;
  };

  const [activeStep, setActiveStep] = useState(getSavedStep);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // MembershipForm's own save button only enables once the user actually
  // changes something (see MembershipForm.jsx) — an existing member whose
  // data is already correct would otherwise have no way to move on, since
  // there's nothing for them to save. This mirrors that gate so the
  // step's own "continue" button covers exactly that case, and hides
  // itself while the user has unsaved edits in flight.
  const userIsEditingData = buttonDisabled && activeStep === 0 && hasMembershipInCart;

  const isMobile = useMediaQuery(MOBILE_NORMAL);

  const stepTitles = [
    t("checkout.step1-title"),
    t("checkout.step2-title"),
    t("checkout.step3-title"),
  ];
  const stepShort = [
    t("checkout.step1-short"),
    t("checkout.step2-short"),
    t("checkout.step3-short"),
  ];

  useEffect(() => {
    if (user_data?.member) {
      getMemberProfile();
    }
  }, [getMemberProfile, user_data?.member]);

  useEffect(() => {
    localStorage.setItem(CHECKOUT_STEP_KEY, activeStep);
  }, [activeStep]);

  const goToStep = useCallback(
    (step) => {
      setActiveStep(step);
      isMobile && window.scrollTo(0, 0);
    },
    [isMobile],
  );

  const handleNext = useCallback(
    (fromStep) => {
      if (fromStep === 1) {
        setLoading(true);
        checkoutCart()
          .then(() => !isPaymentFree && checkoutPaymentCart(id))
          .then(() => {
            goToStep(fromStep + 1);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        goToStep(fromStep + 1);
      }
    },
    [checkoutCart, checkoutPaymentCart, id, isPaymentFree, goToStep],
  );

  if (!item_variants.length || !isLoggedIn) return <Navigate to="/" replace />;

  const getStepState = (step) => {
    if (step === activeStep) return "active";
    if (step < activeStep) return "completed";
    return "disabled";
  };

  const visibleSteps = [0, 1, 2];

  return (
    <div className="checkout-shell">
      <div className="checkout-head">
        <h1 className="checkout-head__title">{t("checkout.pagament")}</h1>
        <div className="checkout-progress">
          {stepShort.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="checkout-progress__line" />}
              <span
                className={`checkout-progress__step${
                  activeStep >= i ? " checkout-progress__step--done" : ""
                }`}
              >
                <span className="checkout-progress__dot" />
                {label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="checkout-grid">
        <div className="checkout-steps">
          {visibleSteps.map((step) => {
            const state = getStepState(step);
            return (
              <CheckoutSection
                key={step}
                stepNumber={step + 1}
                title={stepTitles[step]}
                isActive={state === "active"}
                isCompleted={state === "completed"}
                onHeaderClick={() => goToStep(step)}
              >
                {step === 0 && (
                  <div className="checkout-member-step">
                    {hasMembershipInCart ? (
                      <MembershipFormLayout
                        setButtonDisabled={setButtonDisabled}
                        handleNext={() => handleNext(0)}
                      />
                    ) : (
                      <MembershipFormReadOnly isCheckout={true} />
                    )}
                  </div>
                )}

                {step === 1 && <Review />}

                {step === 2 && <Payment />}

                {step === 0 && state === "active" && !userIsEditingData && (
                  <div className="checkout-section__buttons">
                    <Button
                      buttonSize="boton--medium"
                      buttonStyle="boton--primary--solid"
                      onClick={() => handleNext(0)}
                    >
                      {t("checkout.guardar-continuar")}
                    </Button>
                  </div>
                )}

                {step === 1 && state === "active" && (
                  <div className="checkout-section__buttons">
                    <Button
                      buttonSize="boton--medium"
                      buttonStyle="boton--primary--solid"
                      disabled={loading}
                      loading={loading}
                      onClick={() => handleNext(1)}
                    >
                      {t("checkout.ir-al-pago")}
                    </Button>
                  </div>
                )}
              </CheckoutSection>
            );
          })}
        </div>

        <CheckoutSummary />
      </div>
    </div>
  );
}

export default Checkout;
