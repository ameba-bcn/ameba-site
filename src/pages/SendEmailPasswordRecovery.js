import React, { useState } from "react";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MailRecoveryForm from "../components/forms/MailRecoveryForm/MailRecoveryForm";
import { useTranslation } from "react-i18next";
import { isEmptyObject } from "jquery";

export default function SendEmailPasswordRecovery() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [t] = useTranslation("translation");
  const message = useSelector((state) => state.message)

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-container card-login">
          <div className="logTitle">{t("login.recupera-curt")}</div>
          {isSubmitted ? (
            <div className="msg-new-password-sent">{isEmptyObject(message) ? "" : message.message}</div>
          ) : (
            <MailRecoveryForm
              setIsSubmitted={setIsSubmitted}
              isSubmitted={isSubmitted}
            />
          )}
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#FAE6C5"
      />
    </div>
  );
}
