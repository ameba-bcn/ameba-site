import React from "react";
import PowerTitle from "../../components/layout/PowerTitle";
import LettersMove from "../../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import useDataStore from "../../stores/useDataStore";

export default function Booking() {
  const [t] = useTranslation("translation");
  const { support } = useDataStore();

  const filteredAmebaRoster = support.filter(
    (artist) => artist.is_ameba_dj === true,
  );

  return (
    <div className="BookingContent">
      <PowerTitle
        title={"BOOKING"}
        className="SupportTitle"
        subtitle="AMEBA Roster"
        autoScale
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
