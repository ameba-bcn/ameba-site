import React from "react";
import { useSelector } from "react-redux";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import SubscriptionBox from "./SubscriptionBox";

export default function MemberProfile({ setButtonDisabled }) {
  const { user_profile } = useSelector((state) => state.profile);
  const isMember = user_profile === "MEMBER";

  return (
    <div>
      <MembershipFormLayout
        setButtonDisabled={setButtonDisabled}
      />
      {isMember && <SubscriptionBox />}
    </div>
  );
}
