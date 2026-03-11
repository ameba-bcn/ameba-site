import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LettersMove from "../components/layout/LettersMove";
import PasswordRecoveryForm from "./../components/forms/PasswordRecoveryForm/PasswordRecoveryForm";
import "../styles/GlobalStyles.css";

export default function PasswordRecovery(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [strToken, setStrToken] = useState("");
  const parsed = Object.fromEntries(new URLSearchParams(props.location.search));
  const [t] = useTranslation("translation");

  useEffect(() => {
    setStrToken(parsed["token"] || parsed["?token"]);
  }, [parsed, strToken, setStrToken]);

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-form">
          <div className="logTitle">{t("login.recupera-curt")}</div>
          {isSubmitted ? (
            <div className="single-msg">
              <div className="height-block" />
              {t("login.contrasenya-canviada")}
              <NavLink to="/login">LOGIN</NavLink>.
            </div>
          ) : (
            <>
              <PasswordRecoveryForm
                setIsSubmitted={setIsSubmitted}
                strToken={strToken}
              />
              <div className="styled-link">
                <NavLink to="/send-recovery">
                  - {t("login.link-recupera")} -
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
