import React from "react";
import { useTranslation } from "react-i18next";
import { isCORSInactive } from "../../../utils/utils";
import TitleSection from "../TitleSection";

export default function MainSection(props) {
  const { artist = {} } = props;
  const [t] = useTranslation("translation");

  return (
    <div className="bio-gral">
      <TitleSection title="BIO" />
      <div className="bio-section">
        <div className="bio-highlights">
          <div className="bio-data">
            {t("support.top-menu.nom")}/ <span>{artist.name}</span>
          </div>
          <div className="bio-data">
            {t("support.top-menu.ciutat")}/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            {t("support.top-menu.segells")}/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            {t("support.top-menu.projectes")}/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            {t("support.top-menu.artistes")}/ <span>DUMMY TEXT</span>
          </div>
        </div>
        <div className="bio-text">{artist.biography}</div>
        {artist.images && (
          <div className="bio-img">
            <img
              className="bio-img-src"
              src={isCORSInactive() + artist.images[0]}
              alt={artist.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
