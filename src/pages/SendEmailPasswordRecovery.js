import React, { useState } from "react";
import LettersMove from "./../components/layout/LettersMove";
import MailRecoveryForm from "../components/forms/MailRecoveryForm/MailRecoveryForm";
import { useTranslation } from "react-i18next";

export default function SendEmailPasswordRecovery() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [t] = useTranslation("translation");

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-container card-login">
          <div className="logTitle">{t("login.recupera-curt")}</div>
          {isSubmitted ? null : (
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
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
