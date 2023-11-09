import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import { isEmptyObject } from "../utils/utils";
import { useTranslation } from "react-i18next";
import MemberProject from "../components/profile/MemberProject";
import Breadcrums from "../components/breadcrums/Breadcrums";
import useBreadcrumsSteps from "../components/breadcrums/use-breadcrums-steps";
import QrView from "../components/profile/QrView";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user_member_data, user_data } = useSelector((state) => state.auth);
  const { isLoggedIn = false } = auth;
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  const [t] = useTranslation("translation");
  const { step, changeStep } = useBreadcrumsSteps();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const arrView = [
    <MemberProfile isMember={isMember} key="member-profile" />,
    <MemberProject key="member-project" />,
    <QrView key="qr-view-profile" />,
  ];

  return (
    <div className="logViewYellow">
      <div className="profileTitle">{`Hola ${username}!`}</div>
      <Breadcrums
        steps={["PROFILE", "PROJECT", "QR"]}
        step={step}
        changeStep={changeStep}
      />
      {arrView[step]}
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
