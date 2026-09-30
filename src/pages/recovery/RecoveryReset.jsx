import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import AuthAside from "../../components/user/AuthAside";
import Button from "../../components/button/Button";
import useAuthStore from "../../stores/useAuthStore";
import { validate } from "./RecoveryResetValidate";
import "../../components/user/AuthCard.css";
import "./Recovery.css";

export default function RecoveryReset() {
  const [t] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();
  const passwordRecovery = useAuthStore((state) => state.passwordRecovery);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    const parsedToken = parsed["token"] || parsed["?token"] || "";
    setToken(parsedToken);
    // Elimina el token de recovery de la URL visible (historial/referrer).
    if (parsedToken) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [location.search]);

  const formik = useFormik({
    initialValues: { password: "", repeat: "" },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      passwordRecovery(token, values.password)
        .then(() => setDone(true))
        .catch(() => {})
        .finally(() => setLoading(false));
    },
  });

  const firstError = Object.values(formik.errors)[0];

  const aside = (
    <AuthAside
      title={t("login.recupera-aside-titol")}
      mobileTitle={t("login.recupera-aside-titol-mobile")}
      text={t("login.recupera-aside-text")}
      steps={[
        t("login.recupera-pas1"),
        t("login.recupera-pas2"),
        t("login.recupera-pas3"),
      ]}
      activeStep={3}
      helpTextPre={t("login.recupera-ajuda-pre")}
      helpTextPost={t("login.recupera-ajuda-post")}
    />
  );

  if (!token) {
    return (
      <PageLayout section="auth">
        <div className="auth-card">
          {aside}
          <section className="auth-card__form">
            <div className="auth-card__heading">
              <h1>{t("login.recupera-token-invalid-titol")}</h1>
              <p>{t("login.recupera-token-invalid-text")}</p>
            </div>
            <Button
              type="button"
              buttonStyle="boton--back-orange--solid"
              buttonSize="boton--megaxxl"
              hoverStyle="bg-cream"
              onClick={() => navigate("/recupera-contrasenya")}
            >
              {t("login.recupera-token-invalid-cta")}
            </Button>
            <div className="auth-card__links">
              <Link to="/inicia-sessio" className="auth-card__switch">
                {t("login.torna-login")}
              </Link>
            </div>
          </section>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout section="auth">
      <div className="auth-card">
        {aside}

        <section className="auth-card__form">
          <div className="auth-card__heading">
            <span className="recovery-form__step-tag">
              {t("login.recupera-pas-tag", { n: 3 })}
            </span>
            <h1>
              {done ? t("login.recupera-done-titol") : t("login.recupera-reset-titol")}
            </h1>
            {!done && <p>{t("login.recupera-reset-subtitol")}</p>}
          </div>

          {done ? (
            <div className="recovery-done">
              <p>
                {t("login.contrasenya-canviada")}
                <Link to="/inicia-sessio">LOGIN</Link>.
              </p>
              <Button
                type="button"
                buttonStyle="boton--back-orange--solid"
                buttonSize="boton--megaxxl"
                hoverStyle="bg-cream"
                onClick={() => navigate("/inicia-sessio")}
              >
                {t("login.login")}
              </Button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={formik.handleSubmit}>
              <label className="auth-form__field">
                <span className="auth-form__label auth-form__label--row">
                  {t("form.contrassenya")}
                  <button
                    type="button"
                    className="auth-form__reveal"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? t("login.ocultar") : t("login.mostrar")}
                  </button>
                </span>
                <input
                  className="au-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="PASSWORD"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.errors.password)}
                />
                <span className="auth-form__hint">{t("login.password-hint")}</span>
              </label>

              <label className="auth-form__field">
                <span className="auth-form__label">{t("login.recupera-reset-repeteix")}</span>
                <input
                  className="au-input"
                  type={showPassword ? "text" : "password"}
                  name="repeat"
                  autoComplete="new-password"
                  placeholder={t("login.recupera-reset-repeteix").toUpperCase()}
                  value={formik.values.repeat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.errors.repeat)}
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
                {t("login.recupera-guarda")}
              </Button>
            </form>
          )}

          {!done && (
            <div className="auth-card__links">
              <Link to="/recupera-contrasenya" className="auth-card__switch">
                {t("login.link-recupera")}
              </Link>
              <Link to="/inicia-sessio" className="auth-card__recover">
                {t("login.torna-login")}
              </Link>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}
