import React, { useState } from "react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginForm from "../forms/Login/LoginForm";
import RegisterForm from "../forms/Register/RegisterForm";
import Button from "../button/Button";
import Icon from "../ui/Icon";
import AmebaLogo from "../ui/logo/AmebaLogo";
import useCartStore from "../../stores/useCartStore";
import useProfileStore from "../../stores/useProfileStore";
import "./AuthCard.css";

export default function LogComponent() {
  const [t] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const { cart_data = {} } = useCartStore();
  const { item_variant_ids = [] } = cart_data;
  const { user_profile = "" } = useProfileStore();
  const isLogin = location.pathname !== "/signup";

  if (redirect) {
    if (isLogin) {
      return (
        <Navigate to={item_variant_ids.length > 0 ? "/checkout" : "/"} replace />
      );
    }
    return <Navigate to="/validate-email" replace />;
  }

  return (
    <div className="auth-card">
      <aside className="auth-card__aside">
        <AmebaLogo width={76} height={76} fill="var(--color-naranja)" />
        <h2 className="auth-card__aside-title auth-card__aside-title--desktop">
          {t("login.aside-titol")}
        </h2>
        <h2 className="auth-card__aside-title auth-card__aside-title--mobile">
          {t("login.aside-titol-mobile")}
        </h2>
        <p className="auth-card__aside-text">{t("login.aside-text")}</p>
        <div className="auth-card__aside-list">
          <span>
            <span className="auth-card__dot auth-card__dot--naranja" />
            {t("login.aside-bullet1")}
          </span>
          <span>
            <span className="auth-card__dot auth-card__dot--rojo" />
            {t("login.aside-bullet2")}
          </span>
          <span>
            <span className="auth-card__dot auth-card__dot--amarillo" />
            {t("login.aside-bullet3")}
          </span>
        </div>
        {user_profile !== "LOGGED" && (
          <Link to="/nou-soci" className="auth-card__cta">
            {t("login.encara")}
            <Icon icon="plus" width="18" height="18" />
          </Link>
        )}
      </aside>

      <section className="auth-card__form">
        <div className="auth-card__heading">
          <div className="auth-card__heading-logo">
            <AmebaLogo width={52} height={52} fill="var(--color-naranja)" />
          </div>
          <h1>{isLogin ? t("login.login") : t("login.registrat")}</h1>
          <p>{isLogin ? t("login.login-subtitol") : t("login.registre-subtitol")}</p>
        </div>

        <div className="auth-card__tabs" role="tablist" aria-label={t("login.login")}>
          <span className="auth-card__tab-frame">
            <Button
              type="button"
              className=""
              buttonStyle={isLogin ? "boton--back-orange--solid" : "boton--primary--solid"}
              buttonSize="boton--small"
              hoverStyle="bg-cream"
              onClick={() => navigate("/login")}
              role="tab"
              aria-selected={isLogin}
            >
              {t("login.login")}
            </Button>
          </span>
          <span className="auth-card__tab-frame">
            <Button
              type="button"
              className=""
              buttonStyle={!isLogin ? "boton--back-orange--solid" : "boton--primary--solid"}
              buttonSize="boton--small"
              hoverStyle="bg-cream"
              onClick={() => navigate("/signup")}
              role="tab"
              aria-selected={!isLogin}
            >
              {t("login.registrat")}
            </Button>
          </span>
        </div>

        {isLogin ? (
          <LoginForm setRedirect={setRedirect} />
        ) : (
          <RegisterForm setRedirect={setRedirect} />
        )}

        <div className="auth-card__links">
          <Link to={isLogin ? "/signup" : "/login"} className="auth-card__switch">
            {isLogin ? t("login.no-tens-compte") : t("login.inicia")}
          </Link>
          <Link to="/send-recovery" className="auth-card__recover">
            {t("login.recupera-llarg")}
          </Link>
        </div>
      </section>
    </div>
  );
}
