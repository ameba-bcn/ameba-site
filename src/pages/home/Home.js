import React from "react";
import Associacio from "./views/cover/Associacio";
// import SupportLocals from "./views/support/SupportLocals";
import Activitats from "./views/agenda/Activitats";
import Manifesto from "./views/manifesto/Manifesto";
import LettersMove from "../../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <div className="HomeContent">
        <Associacio />
        <Manifesto />
        {/* <SupportLocals /> */}
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
