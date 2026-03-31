import React from "react";
import Associacio from "./views/cover/Associacio";
import Activitats from "./views/agenda/Activitats";
import Manifesto from "./views/manifesto/Manifesto";
import LettersMove from "../../components/layout/LettersMove";
import Banner from "../../components/banner/Banner";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <div className="HomeContent">
        <Banner
          image="/AMEBAFSTVL26banner.png"
          link="https://dice.fm/event/yoanwr-ameba-fstvl-2026-18th-apr-la-terrrazza-barcelona-poble-espanyol-barcelona-carpa-picnic-poble-espanyol-barcelona-tickets"
          alt="AMEBA FSTVL 2026"
          title="AMEBA FSTVL 2026"
        />
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
