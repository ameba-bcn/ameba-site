import React from "react";
import { useSelector } from "react-redux";
// import MemberProfileForm from "../forms/MemberProfileForm";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import SubscriptionBox from "./SubscriptionBox";

export default function MemberProfile({ buttonDisabled, setButtonDisabled }) {
  const { user_profile } = useSelector((state) => state.profile);
  const isMember = user_profile === "MEMBER";

  return (
    <div>
      <MembershipFormLayout
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
      />
      {isMember && <SubscriptionBox date="" />}
    </div>
  );
}
