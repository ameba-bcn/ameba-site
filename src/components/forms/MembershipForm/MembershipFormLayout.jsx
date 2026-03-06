import React from "react";
import { CardContainer } from "../Log.style";
import MembershipForm from "./MembershipForm";

const MembershipFormLayout = ({ setButtonDisabled }) => {
  return (
    <div className="cardForm">
      <CardContainer>
        <MembershipForm setButtonDisabled={setButtonDisabled} />
      </CardContainer>
    </div>
  );
};

export default MembershipFormLayout;
