import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LettersMove from "../components/layout/LettersMove";
import PasswordRecoveryForm from "./../components/forms/PasswordRecoveryForm/PasswordRecoveryForm";
import { StyledHeightBlock, StyledLink } from "../styles/GlobalStyles";

export default function PasswordRecovery(props) {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [strToken, setStrToken] = useState("");
  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const parsed = queryString.parse(props.location.search);
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
              <StyledHeightBlock />
              {t("login.contrasenya-canviada")}
              <NavLink to="/login">LOGIN</NavLink>.
            </div>
          ) : (
            <>
              <PasswordRecoveryForm
                setIsSubmitted={setIsSubmitted}
                strToken={strToken}
              />
              <StyledLink>
                <NavLink to="/send-recovery">
                  - {t("login.link-recupera")} -
                </NavLink>
              </StyledLink>
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
