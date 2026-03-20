import React from "react";
import Associacio from "./views/cover/Associacio";
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
        <Activitats />
      </div>
      <LettersMove
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="var(--color-rojo)"
      />
    </div>
  );
}
