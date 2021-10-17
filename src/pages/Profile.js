import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import MembershipFormReadOnly from "../components/forms/MembershipForm/MembershipFormReadOnly";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user_member_data } = useSelector((state) => state.auth);
  const { isLoggedIn = false } = auth;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="logViewYellow">
      <div className="profileTitle">{!!user_member_data ?`Hola ${user_member_data?.first_name}!`:"Hola!"}</div>
      {!!user_member_data ? <MemberProfile /> : <MembershipFormReadOnly />}
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}
