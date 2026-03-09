import React from "react";
import { useTranslation } from "react-i18next";

export default function EntrevistaMenu(props) {
  const {
    hasMediaSection = false,
    hasActivitiesSection = false,
    hasInterviews = false,
  } = props;
  const [t] = useTranslation("translation");

  return (
    <div className="menu-entrevista">
      <a href="#bio-gral">
        <div className="menu-e menu-bio">{t("support.menu.bio")}</div>
      </a>
      {hasInterviews && (
        <a href="#entrevista-gral">
          <div className="menu-e menu-entrev">
            {t("support.menu.entrevista")}
          </div>
        </a>
      )}
      {hasMediaSection && (
        <a href="#media-gral">
          <div className={`menu-e ${hasActivitiesSection?`menu-media`:`menu-activit`}`}>{t("support.menu.media")}</div>
        </a>
      )}
      {hasActivitiesSection && (
        <a href="#activitats-gral">
          <div className="menu-e menu-activit">
            {t("support.menu.activitats")}
          </div>
        </a>
      )}
    </div>
  );
}
