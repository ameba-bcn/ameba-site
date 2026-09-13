import React, { useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import InputField from "../InputField/InputField";
import "../Log.style.css";
import "./MembershipFormReadOnly.style.css";
import useAuthStore from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";
import Button from "../../button/Button";
import { usernameValidation } from "../../../utils/validations";
import { API_URL, ERROR, MOBILE_SMALL } from "../../../utils/constants";
import axiosInstance from "../../../axios";
import useMediaQuery from "../../../hooks/use-media-query";

export default function MembershipFormReadOnly(props) {
  const [t] = useTranslation("translation");
  const { isCheckout = false } = props;
  const { user_data = {}, user_member_data = {} } = useAuthStore();
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(user_data?.username || "");
  const isMinMobile = useMediaQuery(MOBILE_SMALL);
  const location = useLocation();
  const section = location.pathname;

  const showPasswordRecover = () => {
    setRedirect(true);
  };
  if (redirect) return <Navigate to="/recupera-contrasenya" replace />;
  const inProfileView = section.includes("profile");
  const errors = usernameValidation(user) || user.length === 0;

  const setNewUserName = () => {
    axiosInstance
      .patch(`${API_URL}users/current/`, { username: user })
      .then(() => {})
      .catch((err) => {
        console.warn("ERROR: ", err);
      });
  };

  return (
    <div className="cardForm">
      <div className="card-form">
        <div className="readonly-fields">
          <form>
            {inProfileView ? (
              <div className="field-wrapper">
                <InputField
                  id="user"
                  name="user"
                  type="text"
                  label={t("form.usuari")}
                  onChange={(e) => setUser(e.target.value)}
                  slimLine={true}
                  value={user}
                  valid={!usernameValidation(user)}
                />
                {errors && (
                  <div className="log-form-error">
                    <div>{ERROR.USERNAME.FORMAT}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="readonly-field">
                <div className="readonly-field__row">
                  <span className="readonly-field__label">{t("form.usuari")}</span>
                  <Link to="/compte" className="readonly-field__edit">
                    {t("checkout.editar")}
                  </Link>
                </div>
                <div className="readonly-field__value">{user_data?.username}</div>
              </div>
            )}

            <div className="readonly-field">
              <div className="readonly-field__row">
                <span className="readonly-field__label">{t("form.soci")}</span>
                <span className="readonly-field__hint">{t("checkout.no-editable")}</span>
              </div>
              <div className="readonly-field__value">
                {user_data?.number || user_member_data?.number || "-"}
              </div>
            </div>

            <div className="readonly-field">
              <div className="readonly-field__row">
                <span className="readonly-field__label">Email</span>
                <span className="readonly-field__hint">{t("checkout.no-editable")}</span>
              </div>
              <div className="readonly-field__value">{user_data?.email}</div>
            </div>
          </form>

          {!inProfileView && (
            <p className="readonly-fields__note">{t("checkout.readonly-note")}</p>
          )}
        </div>
        {!isCheckout && (
          <div className="log-button-box">
            {user_data?.username !== user ? (
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
                onClick={setNewUserName}
              >
                {t("boto.guarda")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--small" : "boton--medium"}
                buttonStyle="boton--primary--solid"
                onClick={showPasswordRecover}
              >
                {t("login.modifica")}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
