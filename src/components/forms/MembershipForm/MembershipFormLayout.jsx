import React from "react";
import "../Log.style.css";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled, handleNext }) => {
  return (
    <div className="cardForm">
      <div className="log-card-container">
        <MembershipForm
          setButtonDisabled={setButtonDisabled}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default MembershipFormLayout;
