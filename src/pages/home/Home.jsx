import React from "react";
import Associacio from "./views/cover/Associacio";
import Activitats from "./views/agenda/Activitats";
import Manifesto from "./views/manifesto/Manifesto";
import LettersMove from "../../components/layout/LettersMove";
import PageMeta from "../../components/seo/PageMeta";
import { useTranslation } from "react-i18next";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AMEBA — Associació de Música Electrònica de Barcelona",
  url: "https://ameba.cat",
  logo: "https://ameba.cat/AmebaLogo.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@ameba.cat",
    contactType: "customer service",
  },
};

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <PageMeta url="/" jsonLd={ORG_JSON_LD} />
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
