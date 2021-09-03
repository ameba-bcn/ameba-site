import React from "react";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "../components/layout/LettersMove";
import CardGrid from "../components/layout/CardGrid";
// import { useMediaQuery } from "@material-ui/core";

export default function Booking() {
  // const isMobile = useMediaQuery("(max-width:690px)");

  return (
    <div className="BookingContent">
      <PowerTitle
        title={"#BOOKING"}
        className="SupportTitle"
        subtitle="- AMEBA Rooster -"
      />
      {/* <h3 className="SupportSubtitle">
        - Conèix als professionals que donen vida a la ciutat -
      </h3> */}
      <CardGrid isInterview={false}/>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#FAE6C5"
      />
    </div>
  );
}
