import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import { isEmptyObject } from "../utils/utils";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user_member_data, user_data } = useSelector((state) => state.auth);
  const { isLoggedIn = false } = auth;
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  console.log("user_member_data", user_member_data);
  return (
    <div className="logViewYellow">
      <div className="profileTitle">{`Hola ${username}!`}</div>
      <MemberProfile isMember={isMember} />
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}
