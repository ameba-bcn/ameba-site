import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";
import { isEmptyObject } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import Breadcrums from "../../components/breadcrums/Breadcrums";
import useBreadcrumsSteps from "../../components/breadcrums/use-breadcrums-steps";
import MemberProfile from "./views/MemberProfile";
import QrView from "./views/QrView";
import MemberProject from "./views/MemberProject";

export default function Profile() {
  const {
    user_member_data,
    user_data,
    isLoggedIn = false,
  } = useSelector((state) => state.auth);
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  const [t] = useTranslation("translation");
  const { step, changeStep } = useBreadcrumsSteps();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const arrView = isMember
    ? [
        <MemberProfile isMember={isMember} key="member-profile" />,
        <MemberProject key="member-project" />,
        <QrView key="qr-view-profile" />,
      ]
    : [<MemberProfile isMember={isMember} key="member-profile" />];

  const profileOptions = isMember ? ["PROFILE", "PROJECT", "QR"] : ["PROFILE"];

  return (
    <div className="logViewYellow">
      <div className="profileTitle">{`Hola ${username}!`}</div>
      {profileOptions.length > 1 && (
        <Breadcrums
          steps={profileOptions}
          step={step}
          changeStep={changeStep}
        />
      )}
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
