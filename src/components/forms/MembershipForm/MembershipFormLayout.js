import React, { useState } from "react";
import ErrorBox from "../error/ErrorBox";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled }) => {
  const [displayError, setDisplayError] = useState(false);
  const [successful, setSuccessful] = useState(false);

  return (
    <div className="cardForm">
      <div className="card card-container card-member">
        <div className="logTitleSmall">Dades personals</div>
        <MembershipForm
          setDisplayError={setDisplayError}
          setSuccessful={setSuccessful}
          setButtonDisabled={setButtonDisabled}
        />
        {displayError && <ErrorBox isError={!successful} />}
      </div>
    </div>
  );
};

export default MembershipFormLayout;
