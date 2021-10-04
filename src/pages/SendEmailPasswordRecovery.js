import React, { useState } from "react";
import LettersMove from "./../components/layout/LettersMove";
import MailRecoveryForm from "../components/forms/MailRecoveryForm/MailRecoveryForm";

export default function SendEmailPasswordRecovery() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-container card-login">
          <div className="logTitle">Recupera contrasenya</div>
          {isSubmitted ? (
            <div className="msg-new-password-sent">
              Hem enviat una contrasenya nova al teu correu electrònic.
              Verifícala per poder continuar.
            </div>
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
        sentence="FES-TE SOCI/A "
        color="#FAE6C5"
      />
    </div>
  );
}
