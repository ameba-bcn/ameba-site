import React from "react";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "./../components/layout/LettersMove";
import { useMediaQuery } from "@material-ui/core";
import CardGrid from "../components/layout/CardGrid";

export default function SupportYourLocals() {
  const isMobile = useMediaQuery("(max-width:690px)");

  return (
    <div className="SupportContent" id="SupportContent">
      <PowerTitle
        title={isMobile ? "#SUPPORT" : "#SUPPORTYOURLOCALS"}
        className="SupportTitle"
        subtitle="- Conèix als professionals que donen vida a la ciutat -"
      />
      <CardGrid/>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#FAE6C5"
      />
    </div>
  );
}
