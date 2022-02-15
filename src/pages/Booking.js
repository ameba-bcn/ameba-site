import React from "react";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "../components/layout/LettersMove";
import CardGrid from "../components/layout/CardGrid";
import { useTranslation } from "react-i18next";

export default function Booking() {
  const [t] = useTranslation("translation");

  return (
    <div className="BookingContent">
      <PowerTitle
        title={"BOOKING"}
        className="SupportTitle"
        subtitle="AMEBA Roster"
      />
      <CardGrid isAmebaDJ={true}/>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#FAE6C5"
      />
    </div>
  );
}
