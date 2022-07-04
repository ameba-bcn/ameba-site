import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LettersMove from "../components/layout/LettersMove";
import { isEmptyObject } from "../utils/utils";
import PasswordRecoveryForm from "./../components/forms/PasswordRecoveryForm/PasswordRecoveryForm";

export default function PasswordRecovery(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [strToken, setStrToken] = useState("");
  const queryString = require("query-string");
  const parsed = queryString.parse(props.location.search);
  const [t] = useTranslation("translation");
  const message = useSelector((state) => state.message);

  useEffect(() => {
    setStrToken(parsed["token"]);
  }, [parsed, strToken, setStrToken]);

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-container card-login">
          <div className="logTitle">{t("login.recupera-curt")}</div>
          {isSubmitted ? (
            <>
              <div className="full-height-msg">
                <div className="single-msg">
                  {isEmptyObject(message) ? "" : message.message}
                </div>
              </div>
            </>
          ) : (
            <>
              <PasswordRecoveryForm
                setIsSubmitted={setIsSubmitted}
                isSubmitted={isSubmitted}
                strToken={strToken}
              />
              <span className="logTextosLink">
                <NavLink to="/send-recovery">
                  - {t("login.link-recupera")} -
                </NavLink>
              </span>
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
