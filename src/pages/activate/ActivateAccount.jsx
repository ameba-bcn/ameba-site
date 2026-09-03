import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import AuthAside from "../../components/user/AuthAside";
import Button from "../../components/button/Button";
import Icon from "../../components/ui/Icon";
import Spinner from "../../components/spinner/Spinner";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import "../../components/user/AuthCard.css";
import "./ActivateAccount.css";

export default function ActivateAccount() {
  const [t] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();
  const validateEmail = useAuthStore((state) => state.validateEmail);
  const getUserData = useAuthStore((state) => state.getUserData);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const getCart = useCartStore((state) => state.getCart);
  const { cart_data = {} } = useCartStore();
  const { item_variant_ids = [] } = cart_data;
  const email = location.state?.email;

  const parsed = Object.fromEntries(new URLSearchParams(location.search));
  const token = parsed["token"] || parsed["?token"];

  const [step, setStep] = useState(token ? "checking" : "pending");

  useEffect(() => {
    if (!token) return;
    window.history.replaceState(null, "", window.location.pathname);
    validateEmail(token).then(
      () => {
        getUserData().then((data) => {
          if (data?.member) getMemberProfile();
        });
        getCart();
        setStep("done");
      },
      () => setStep("error"),
    );
  }, [token, validateEmail, getUserData, getMemberProfile, getCart]);

  const meta = {
    pending: {
      tag: t("login.activa-tag-pending"),
      titol: t("login.activa-titol-pending"),
      subtitol: t("login.activa-subtitol-pending"),
    },
    checking: {
      tag: t("login.activa-tag-checking"),
      titol: t("login.activa-titol-checking"),
      subtitol: t("login.activa-subtitol-checking"),
    },
    done: {
      tag: t("login.activa-tag-done"),
      titol: t("login.activa-titol-done"),
      subtitol: t("login.activa-subtitol-done"),
    },
    error: {
      tag: t("login.activa-tag-error"),
      titol: t("login.activa-titol-error"),
      subtitol: t("login.activa-subtitol-error"),
    },
  }[step];

  const handleGoToAccount = () => {
    navigate(item_variant_ids.length > 0 ? "/pagament" : "/compte");
  };

  return (
    <PageLayout section="auth">
      <div className="auth-card">
        <AuthAside
          title={t("login.activa-aside-titol")}
          mobileTitle={t("login.activa-aside-titol-mobile")}
          text={t("login.activa-aside-text")}
          steps={[
            t("login.activa-pas1"),
            t("login.activa-pas2"),
            t("login.activa-pas3"),
          ]}
          activeStep={step === "done" ? 4 : 2}
          helpTextPre={t("login.activa-ajuda-pre")}
          helpTextPost={t("login.activa-ajuda-post")}
        />

        <section className="auth-card__form">
          <div className="auth-card__heading">
            <span className={`activate-state activate-state--${step}`}>
              {meta.tag}
            </span>
            <h1>{meta.titol}</h1>
            <p>{meta.subtitol}</p>
          </div>

          {step === "pending" && (
            <div className="activate-body">
              <div className="activate-mail">
                <Icon icon="assist" type="hoverable-black" width="20" height="20" />
                <p>
                  {email ? (
                    <>
                      {t("login.activa-mail-missatge-pre")} <strong>{email}</strong>
                      {t("login.activa-mail-missatge-post")}
                    </>
                  ) : (
                    t("login.activa-mail-generic")
                  )}
                </p>
              </div>
              <ul className="activate-tips">
                <li>{t("login.activa-tip1")}</li>
                <li>{t("login.activa-tip2")}</li>
              </ul>
            </div>
          )}

          {step === "checking" && (
            <div className="activate-checking">
              <Spinner size={28} />
              <span>{t("login.activa-checking-label")}</span>
            </div>
          )}

          {step === "done" && (
            <div className="activate-body">
              <div className="activate-mail activate-mail--done">
                <p>{t("login.activa-done-missatge")}</p>
              </div>
              <Button
                type="button"
                buttonStyle="boton--back-orange--solid"
                buttonSize="boton--megaxxl"
                hoverStyle="bg-cream"
                onClick={handleGoToAccount}
              >
                {t("login.activa-done-cta")}
              </Button>
              <Link to="/associacio/nou-soci" className="activate-inline-link">
                {t("login.activa-done-nou-soci")}
              </Link>
            </div>
          )}

          {step === "error" && (
            <div className="activate-body">
              <div className="activate-mail activate-mail--error">
                <p>{t("login.activa-error-missatge")}</p>
              </div>
              <Button
                type="button"
                buttonStyle="boton--back-orange--solid"
                buttonSize="boton--megaxxl"
                hoverStyle="bg-cream"
                onClick={() => navigate("/registre")}
              >
                {t("login.activa-error-cta")}
              </Button>
            </div>
          )}

          <div className="auth-card__links">
            <Link to="/inicia-sessio" className="auth-card__switch">
              {t("login.torna-login")}
            </Link>
            <Link to="/" className="auth-card__recover">
              {t("login.activa-footer-navega")}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
