import React, { useEffect, useState, useCallback } from "react";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import Review from "./Review";
import { isMemberCheckout } from "../../utils/utils";
import "./Checkout.css";
import Button from "../button/Button";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import "./Checkout.style.css";
import Payment from "./Payment";
import { MOBILE_NORMAL, MOBILE_SMALL } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import useCartStore from "../../stores/useCartStore";
import useMediaQuery from "../../hooks/use-media-query";

const CHECKOUT_STEP_KEY = "checkoutStep";

function CheckoutSection({
  stepNumber,
  title,
  isActive,
  isCompleted,
  onHeaderClick,
  children,
}) {
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
    <div className={`checkout-section ${stateClass}`}>
      <div className="checkout-section__header" onClick={handleClick}>
        <div className="checkout-section__header-left">
          <span className="checkout-section__number">{stepNumber}</span>
          <span className="checkout-section__title">{title}</span>
        </div>
        <span className="checkout-section__indicator">
          {isCompleted ? "\u2713" : isActive ? "\u25BC" : ""}
        </span>
      </div>
      <div className="checkout-section__body">
        <div className="checkout-section__content">{children}</div>
      </div>
    </div>
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
    return saved;
  };

  const [activeStep, setActiveStep] = useState(getSavedStep);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const userIsEditingData =
    buttonDisabled && activeStep === 0 && hasMembershipInCart;

  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const isMinMobile = useMediaQuery(MOBILE_SMALL);

  const steps =
    localStorage.getItem("i18nextLng") === "es"
      ? ["Datos personales", "Cesta", "Datos de pago"]
      : ["Dades personals", "Cistella", "Dades de pagament"];

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

  const handleSectionClick = useCallback(
    (step) => {
      goToStep(step);
    },
    [goToStep],
  );

  if (!item_variants.length || !isLoggedIn) return <Navigate to="/" replace />;

  const getStepState = (step) => {
    if (step === activeStep) return "active";
    if (step < activeStep) return "completed";
    return "disabled";
  };

  const visibleSteps = [0, 1, 2];

  return (
    <div className="checkout-frame">
      <div className="checkout-box">
        <div className="checkout-title">{t("checkout.pagament")}</div>

        {visibleSteps.map((step) => {
          const state = getStepState(step);
          return (
            <CheckoutSection
              key={step}
              stepNumber={step + 1}
              title={steps[step]}
              isActive={state === "active"}
              isCompleted={state === "completed"}
              isDisabled={state === "disabled"}
              onHeaderClick={() => handleSectionClick(step)}
            >
              {step === 0 && (
                <div className="checkout-member-frame">
                  {hasMembershipInCart ? (
                    <MembershipFormLayout
                      setButtonDisabled={setButtonDisabled}
                    />
                  ) : (
                    <MembershipFormReadOnly isCheckout={true} />
                  )}
                </div>
              )}

              {step === 1 && <Review />}

              {step === 2 && <Payment />}

              {loading && step === activeStep && (
                <span className="spinner-border"></span>
              )}

              {step < 2 && step === activeStep && (
                <div className="checkout-section__buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize={isMinMobile ? "boton--medium" : "boton--large"}
                    buttonStyle="boton--primary--solid"
                    disabled={loading || (step === 0 && userIsEditingData)}
                    onClick={() => handleNext(step)}
                  >
                    {t("boto.seguent")}
                  </Button>
                </div>
              )}
            </CheckoutSection>
          );
        })}
      </div>
    </div>
  );
}

export default Checkout;
