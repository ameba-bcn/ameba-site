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
    to: "/associacio",
    // Sin morePosition: el (+) se alinea con el del resto de bandas
    // (.section-band__more, right: clamp(16px, 4vw, 64px) / top: 50%).
    // Antes iba pegado al borde derecho de la columna de texto centrada
    // (948px), lo que en pantallas anchas lo dejaba ~300px a la izquierda
    // de los demás.
  },
  {
    id: "festivals",
    color: "var(--section-festivals)",
    image: home2,
    to: "/lab",
    dotsPosition: "top-right",
  },
  {
    id: "lab",
    color: "var(--section-lab)",
    image: home3,
    to: "/lab",
    dotsPosition: "image-top-right",
  },
  {
    id: "shop",
    color: "var(--section-shop)",
    image: home4,
    to: "/botiga",
    dotsPosition: "bottom-left",
  },
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
            morePosition={band.morePosition}
            dotsPosition={band.dotsPosition}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
