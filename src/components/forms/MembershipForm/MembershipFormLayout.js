import React, { useState } from "react";
import { useSelector } from "react-redux";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({
  handleNext,
  buttonDisabled,
  setButtonDisabled,
}) => {
  const [displayError, setDisplayError] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { user_profile } = useSelector((state) => state.profile);

  return (
    <div className="col-md-12">
      <div className="card card-container card-login">
        <MembershipForm
          setDisplayError={setDisplayError}
          user_profile={user_profile}
          handleNext={handleNext}
          buttonDisabled={buttonDisabled}
          setButtonDisabled={setButtonDisabled}
        />
        {displayError && message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipFormLayout;
