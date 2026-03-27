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
  const { user_member_data, user_data, isLoggedIn = false } = useAuthStore();
  const { username = "" } = user_data;
  const isMember = !isEmptyObject(user_member_data);
  const [t] = useTranslation("translation");
  const location = useLocation();
  const section = location.pathname.split("/")?.at(-1);
  const routeKeys = ["profile", "project"];
  const { step, changeStep } = useBreadcrumsSteps(
    routeKeys.indexOf(section?.toLowerCase()),
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/profile") {
    return <Navigate to="/profile/profile" replace />;
  }

  const arrView = isMember
    ? [
        <MemberProfile isMember={isMember} key="member-profile" />,
        <MemberProject key="member-project" />,
      ]
    : [<MemberProfile isMember={isMember} key="member-profile" />];

  const profileOptions = isMember
    ? [
        { path: "profile", label: t("perfil.breadcrumb-perfil") },
        { path: "project", label: t("perfil.breadcrumb-projecte") },
      ]
    : [{ path: "profile", label: t("perfil.breadcrumb-perfil") }];

  return (
    <PageLayout
      className="logViewYellow"
      title="perfil"
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
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
