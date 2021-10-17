import React from "react";
import MemberProfile from "../profile/MemberProfile";
import "./ExtendMembership.css";

export default function ExtendMembership({
  buttonDisabled = false,
  setButtonDisabled,
}) {
  return (
    <div>
      <div className="logTitleSmall">Dades personals</div>
      <MemberProfile
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
      />
    </div>
  );
}
