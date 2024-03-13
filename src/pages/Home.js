import React from "react";
import Associacio from "../components/main/Associacio";
import SupportLocals from "../components/main/SupportLocals";
import Activitats from "../components/main/Activitats";
import Manifesto from "../components/main/Manifesto";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <div className="HomeContent">
        <Associacio />
        <Manifesto />
        <SupportLocals />
        <Activitats />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
