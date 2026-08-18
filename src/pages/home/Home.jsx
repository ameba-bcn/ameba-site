import React from "react";
import Hero from "./views/cover/Hero";
import SectionBand from "./views/band/SectionBand";
import PageMeta from "../../components/seo/PageMeta";
import { useTranslation } from "react-i18next";
import home1 from "../../assets/images/home/home1.jpg";
import home2 from "../../assets/images/home/home2.jpg";
import home3 from "../../assets/images/home/home3.jpg";
import home4 from "../../assets/images/home/home4.jpg";

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
  {
    id: "associacio",
    color: "var(--section-associacio)",
    image: home1,
    to: "/socis",
  },
  {
    id: "festivals",
    color: "var(--section-festivals)",
    image: home2,
    to: "/activitats",
  },
  { id: "lab", color: "var(--section-lab)", image: home3, to: "/lab" },
  { id: "shop", color: "var(--section-shop)", image: home4, to: "/botiga" },
];

export default function Home() {
  const [t] = useTranslation("translation");
  return (
    <div className="Home">
      <PageMeta url="/" description={t("home.meta")} jsonLd={ORG_JSON_LD} />
      <div className="HomeContent">
        <Hero />
        {BANDS.map((band, index) => (
          <SectionBand
            key={band.id}
            id={band.id}
            color={band.color}
            title={t(`menu.${band.id}`)}
            image={band.image}
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
