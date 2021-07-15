import React from "react";
import { useSelector } from "react-redux";
import MemberProfileForm from "../forms/MemberProfileForm";

export default function MemberProfile({ buttonDisabled, setButtonDisabled }) {
  const auth = useSelector((state) => state.auth);
  const { user_member_data = {} } = auth;
  return (
    <div>
      <MemberProfileForm
        initialValues={user_member_data}
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
      />
    </div>
  );
}
