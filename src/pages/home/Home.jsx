import React from "react";
import Hero from "./views/cover/Hero";
import SectionBand from "./views/band/SectionBand";
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

const BANDS = [
  { id: "associacio", color: "var(--section-associacio)", to: null },
  { id: "festivals", color: "var(--section-festivals)", to: null },
  { id: "lab", color: "var(--section-lab)", to: "/lab" },
  { id: "shop", color: "var(--section-shop)", to: "/botiga" },
];

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <PageMeta url="/" description={t("home.meta")} jsonLd={ORG_JSON_LD} />
      <div className="HomeContent">
        <Hero />
        <LettersMove
          sentence={t("banners.soci-curt")}
          link="/memberships"
          color="var(--color-rojo)"
        />
        {BANDS.map((band, index) => (
          <SectionBand
            key={band.id}
            id={band.id}
            color={band.color}
            title={t(`menu.${band.id}`)}
            image="/AmebaPortadaDesktop.jpg"
            lead={t(`home.band.${band.id}.lead`)}
            body={t(`home.band.${band.id}.body`)}
            to={band.to}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
