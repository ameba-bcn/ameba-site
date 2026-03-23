import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import useAuthStore from "../../stores/useAuthStore";
import { isEmptyObject } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import Breadcrums from "../../components/breadcrums/Breadcrums";
import useBreadcrumsSteps from "../../components/breadcrums/use-breadcrums-steps";
import MemberProfile from "./views/MemberProfile";
import MemberProject from "./views/MemberProject";

export default function Profile() {
  const {
    user_member_data,
    user_data,
    isLoggedIn = false,
  } = useAuthStore();
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  const [t] = useTranslation("translation");
  const location = useLocation();
  const section = location.pathname.split("/")?.at(-1);
  const { step, changeStep } = useBreadcrumsSteps(
    ["PROFILE", "PROJECT"].indexOf(section?.toUpperCase())
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const arrView = isMember
    ? [
        <MemberProfile isMember={isMember} key="member-profile" />,
        <MemberProject key="member-project" />,
      ]
    : [<MemberProfile isMember={isMember} key="member-profile" />];

  const profileOptions = isMember ? ["PROFILE", "PROJECT"] : ["PROFILE"];

  return (
    <PageLayout
      className="logViewYellow"
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <div className="profileTitle">{`Hola ${username}!`}</div>
      {profileOptions.length > 1 && (
        <Breadcrums
          steps={profileOptions}
          step={step}
          changeStep={changeStep}
        />
      )}
      {arrView[step] || arrView[0]}
    </PageLayout>
  );
}
