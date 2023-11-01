import React from "react";
import { useSelector } from "react-redux";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import CardLayout from "../components/layout/CardLayout/CardLayout";

export default function SupportYourLocals() {
  const [t] = useTranslation("translation");
  const { support } = useSelector((state) => state.data);
  const filteredArtists =
    support.filter((artist) => artist.is_ameba_dj === false) || support;

  return (
    <div className="SupportContent" id="SupportContent">
      <PowerTitle
        title={"#SUPPORTYOURLOCALS"}
        className="SupportTitle"
        subtitle={t("support.title.subtitle")}
      />
      <CardLayout cardList={filteredArtists} urlRoot="support" />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
