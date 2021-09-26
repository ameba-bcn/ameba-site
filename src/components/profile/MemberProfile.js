import React, { useState } from "react";
import { useSelector } from "react-redux";
// import MemberProfileForm from "../forms/MemberProfileForm";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";

export default function MemberProfile({ buttonDisabled, setButtonDisabled }) {

  // const auth = useSelector((state) => state.auth);
  // const { user_member_data = {} } = auth;
  return (
    <div>
      <MembershipFormLayout
      // <MemberProfileForm
        
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
      />
    </div>
  );
}
