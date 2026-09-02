import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import AuthAside from "../../components/user/AuthAside";
import Button from "../../components/button/Button";
import Icon from "../../components/ui/Icon";
import useAuthStore from "../../stores/useAuthStore";
import { validate } from "./RecoveryRequestValidate";
import "../../components/user/AuthCard.css";
import "./Recovery.css";

export default function RecoveryRequest() {
  const [t] = useTranslation("translation");
  const sendEmailPasswordRecovery = useAuthStore(
    (state) => state.sendEmailPasswordRecovery,
  );
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [resendCount, setResendCount] = useState(0);

  const formik = useFormik({
    initialValues: { email: "" },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      sendEmailPasswordRecovery(values.email)
        .then(() => {
          setSent(true);
          setSentTo(values.email);
          setResendCount(0);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    },
  });

  const handleResend = () => {
    setLoading(true);
    sendEmailPasswordRecovery(sentTo)
      .then(() => setResendCount((n) => n + 1))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleUseAnotherEmail = () => {
    setSent(false);
    setResendCount(0);
    formik.resetForm();
  };

  const firstError = Object.values(formik.errors)[0];

  return (
    <PageLayout section="auth">
      <div className="auth-card">
        <AuthAside
          title={t("login.recupera-aside-titol")}
          mobileTitle={t("login.recupera-aside-titol-mobile")}
          text={t("login.recupera-aside-text")}
          steps={[
            t("login.recupera-pas1"),
            t("login.recupera-pas2"),
            t("login.recupera-pas3"),
          ]}
          activeStep={sent ? 2 : 1}
          helpTextPre={t("login.recupera-ajuda-pre")}
          helpTextPost={t("login.recupera-ajuda-post")}
        />

        <section className="auth-card__form">
          <div className="auth-card__heading">
            <span className="recovery-form__step-tag">
              {t("login.recupera-pas-tag", { n: sent ? 2 : 1 })}
            </span>
            <h1>
              {sent
                ? t("login.recupera-sent-titol")
                : t("login.recupera-request-titol")}
            </h1>
            <p>
              {sent
                ? t("login.recupera-sent-subtitol")
                : t("login.recupera-request-subtitol")}
            </p>
          </div>

          {sent ? (
            <div className="recovery-sent">
              <div className="recovery-sent__callout">
                <Icon icon="assist" type="hoverable-black" width="20" height="20" />
                <p>
                  {t("login.recupera-sent-missatge-pre")}{" "}
                  <strong>{sentTo}</strong>
                  {t("login.recupera-sent-missatge-post")}
                </p>
              </div>

              <ul className="recovery-sent__tips">
                <li>{t("login.recupera-tip1")}</li>
                <li>{t("login.recupera-tip2")}</li>
              </ul>

              <div className="recovery-sent__actions">
                <Button
                  type="button"
                  buttonStyle="boton--primary--solid"
                  buttonSize="boton--medium"
                  hoverStyle="bg-cream"
                  onClick={handleResend}
                  loading={loading}
                >
                  {resendCount ? t("login.recupera-reenviar-again") : t("login.recupera-reenviar")}
                </Button>
                <button
                  type="button"
                  className="auth-form__reveal"
                  onClick={handleUseAnotherEmail}
                >
                  {t("login.recupera-altre-email")}
                </button>
              </div>
              <div className="auth-form__message" aria-live="polite">
                {resendCount > 0 && t("login.recupera-reenviat", { n: resendCount })}
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={formik.handleSubmit}>
              <label className="auth-form__field">
                <span className="auth-form__label">{t("login.recupera-email-label")}</span>
                <input
                  className="au-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="EMAIL"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.errors.email)}
                />
              </label>

              <div className="auth-form__message auth-form__message--error">
                {firstError}
              </div>

              <Button
                type="submit"
                buttonStyle="boton--back-orange--solid"
                buttonSize="boton--megaxxl"
                hoverStyle="bg-cream"
                loading={loading}
              >
                {t("login.recupera-enviar")}
              </Button>
            </form>
          )}

          <div className="auth-card__links">
            <Link to="/login" className="auth-card__switch">
              {t("login.torna-login")}
            </Link>
            <Link to="/signup" className="auth-card__recover">
              {t("login.no-tens-compte")}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
