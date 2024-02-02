import React from "react";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "./../components/layout/LettersMove";
import CardGrid from "../components/layout/CardGrid";
import { useTranslation } from "react-i18next";
import { radioDublabLink } from "../utils/constants";

export default function SupportYourLocals() {
  const [t] = useTranslation("translation");

  return (
    <div className="SupportContent" id="SupportContent">
      <PowerTitle
        title={"#SUPPORTYOURLOCALS"}
        className="SupportTitle"
        subtitle={t("support.title.subtitle")}
      />
      <CardGrid />
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#FAE6C5"
      />
    </div>
  );
}
