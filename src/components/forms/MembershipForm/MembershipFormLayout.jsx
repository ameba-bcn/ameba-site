import React from "react";
import "../Log.style.css";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled }) => {
  return (
    <div className="cardForm">
      <div className="log-card-container">
        <MembershipForm setButtonDisabled={setButtonDisabled} />
      </div>
    </div>
  );
};

export default MembershipFormLayout;
