import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { useSelector } from "react-redux";
import { LogFormBox } from "../Log.style";
import { Redirect } from "react-router";

export default function MembershipFormReadOnly() {
  const auth = useSelector((state) => state.auth);
  const { user_data = {} } = auth;
  const [redirect, setRedirect] = useState(false);

  const showPasswordRecover = () => {
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/send-recovery" />;

  return (
    <div className="cardForm">
      <div className="card card-container card-login">
        <div className="logTitleSmall">Dades personals</div>
        <LogFormBox>
          <form>
            <div>
              <InputField
                id="userName"
                name="userName"
                type="text"
                label="usuari"
                value={user_data?.username}
                valid={true}
                disabled={true}
              />
            </div>
            <div>
              <InputField
                id="emailMemberReadOnly"
                name="email"
                type="email"
                label="email"
                value={user_data?.email}
                valid={true}
                disabled={true}
              />
            </div>
          </form>
        </LogFormBox>
          <span className="logTextosLink" onClick={showPasswordRecover}>
            - Modifica la teva contrasenya -
          </span>
      </div>
     </div>
  );
}
