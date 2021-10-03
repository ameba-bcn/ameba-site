import React from "react";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "../components/layout/LettersMove";
import CardGrid from "../components/layout/CardGrid";

export default function Booking() {

  return (
    <div className="BookingContent">
      <PowerTitle
        title={"BOOKING"}
        className="SupportTitle"
        subtitle="- AMEBA Rooster -"
      />
      {/* <h3 className="SupportSubtitle">
        - Conèix als professionals que donen vida a la ciutat -
      </h3> */}
      <CardGrid isAmebaDJ={true}/>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#FAE6C5"
      />
    </div>
  );
}
