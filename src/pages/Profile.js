import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import MembershipFormReadOnly from "../components/forms/MembershipForm/MembershipFormReadOnly";
import { deepComparision } from "../utils/utils";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user_member_data } = useSelector((state) => state.profile);
  const isNewMember = deepComparision(user_member_data, {});

  const { isLoggedIn = false } = auth;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="logViewYellow">
      {isNewMember ? <MemberProfile /> : <MembershipFormReadOnly />}

      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}
