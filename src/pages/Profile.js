import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import { isEmptyObject } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user_member_data, user_data } = useSelector((state) => state.auth);
  const { isLoggedIn = false } = auth;
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  const [t] = useTranslation("translation");

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="logViewYellow">
      <div className="profileTitle">{`Hola ${username}!`}</div>
      <MemberProfile isMember={isMember} />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
}
