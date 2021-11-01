import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";

export default function EntrevistaMenu(props) {
  const { hasMediaSection = false, hasActivitiesSection = false } = props;
  const [t] = useTranslation("translation");

  return (
    <div className="menu-entrevista">
      <Link
        activeClass="active"
        to="bio-gral"
        spy={true}
        smooth={true}
        duration={500}
      >
        <div className="menu-e menu-bio">{t("support.menu.bio")}</div>
      </Link>
      <Link
        activeClass="active"
        to="entrevista-gral"
        spy={true}
        smooth={true}
        duration={500}
      >
        <div className="menu-e menu-entrev">{t("support.menu.entrevista")}</div>
      </Link>
      {hasMediaSection && (
        <Link
          activeClass="active"
          to="media-gral"
          spy={true}
          smooth={true}
          duration={500}
        >
          <div className="menu-e menu-media">{t("support.menu.media")}</div>
        </Link>
      )}
      {hasActivitiesSection && (
        <Link
          activeClass="active"
          to="activitats-gral"
          spy={true}
          smooth={true}
          duration={500}
        >
          <div className="menu-e menu-activit">
            {t("support.menu.activitats")}
          </div>
        </Link>
      )}
    </div>
  );
}
