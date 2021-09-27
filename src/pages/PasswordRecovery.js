import React from "react";
import { NavLink } from "react-router-dom";
import LettersMove from "../components/layout/LettersMove";
import PasswordRecoveryForm from "./../components/forms/PasswordRecoveryForm/PasswordRecoveryForm";

export default function PasswordRecovery(props) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const queryString = require("query-string");
  const parsed = queryString.parse(props.location.search);
  const strToken = parsed.token;

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card card-container card-login">
          <div className="logTitle">Recupera contrasenya</div>
          {isSubmitted ? (
            <>
              <div className="full-height-msg">
                <div className="single-msg">
                  Recuperació de contrasenya finalitzada
                </div>
              </div>
            </>
          ) : (
            <>
              <PasswordRecoveryForm
                setIsSubmitted={setIsSubmitted}
                strToken={strToken}
              />
              <span className="logTextosLink">
                <NavLink to="/send-recovery">
                  - No has rebut cap correu? Torna-ho a intentar -
                </NavLink>
              </span>
            </>
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
