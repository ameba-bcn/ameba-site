import React from "react";
import { useSelector } from "react-redux";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import CardLayout from "../components/layout/CardLayout/CardLayout";

export default function Booking() {
  const [t] = useTranslation("translation");
  const { support } = useSelector((state) => state.data);

  const filteredAmebaRoster = support.filter(
    (artist) => artist.is_ameba_dj === true
  );

  return (
    <div className="BookingContent">
      <PowerTitle
        title={"BOOKING"}
        className="SupportTitle"
        subtitle="AMEBA Roster"
      />
      <CardLayout cardList={filteredAmebaRoster} urlRoot="booking" />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
