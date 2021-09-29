import React, { useState } from "react";
import { useSelector } from "react-redux";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled }) => {
  const [displayError, setDisplayError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  return (
    <div className="cardForm">
      <div className="card card-container card-member">
        <div className="logTitleSmall">Dades personals</div>
        <MembershipForm
          setDisplayError={setDisplayError}
          setSuccessful={setSuccessful}
          setButtonDisabled={setButtonDisabled}
        />
        {displayError && message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipFormLayout;
