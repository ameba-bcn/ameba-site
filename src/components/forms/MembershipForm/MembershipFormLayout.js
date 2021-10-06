import React, { useState } from "react";
import ErrorBox from "../error/ErrorBox";
import { CardContainer } from "../Log.style";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled }) => {
  const [displayError, setDisplayError] = useState(false);
  const [successful, setSuccessful] = useState(false);

  return (
    <div className="cardForm">
      <CardContainer>
        <MembershipForm
          setDisplayError={setDisplayError}
          setSuccessful={setSuccessful}
          setButtonDisabled={setButtonDisabled}
        />
        {displayError && <ErrorBox isError={!successful} />}
      </CardContainer>
    </div>
  );
};

export default MembershipFormLayout;
