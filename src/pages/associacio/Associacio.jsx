import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import SectionHero from "../../components/ui/SectionHero";
import DotsRow from "../../components/ui/DotsRow";
import OutlineHeading from "../../components/ui/OutlineHeading";
import AmebaBlob from "../../components/ui/logo/AmebaBlob";
import Button from "../../components/button/Button";
import { BLOBS, STATS, WORK_GROUPS } from "../../content/associacio";
import { AMEBA_EMAIL } from "../../utils/constants";
import heroImage from "../../assets/images/home/home1.jpg";
import "./Associacio.css";

function Associacio() {
  const [t] = useTranslation("translation");

  return (
    <PageLayout section="associacio" promo>
      <PageMeta
        title="Associació"
        description={t("associacio.meta")}
        url="/associacio"
      />
      <SectionHero
        title={t("menu.associacio")}
        section="associacio"
        image={heroImage}
        imageAlt={t("menu.associacio")}
        lead={t("associacio.hero.lead1")}
      >
        <p>{t("associacio.hero.lead2")}</p>
      </SectionHero>
      <hr />
      <DotsRow />

      {/* Tres blobs: QUI SOM? / QUÈ FEM? / PER QUÈ? */}
      <div className="associacio__blobs">
        {BLOBS.map((key) => (
          <div key={key} className="associacio__blob">
            <AmebaBlob color="black" size={80} />
            <OutlineHeading as="h2">{t(`associacio.blobs.${key}.title`)}</OutlineHeading>
            {/* TODO copy */}
            <p>
              Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
              rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
            </p>
          </div>
        ))}
      </div>

      {/* CTA soci */}
      <div className="associacio__cta">
        <OutlineHeading as="h2" tone="light">
          {t("associacio.cta.title")}
        </OutlineHeading>
        <ul className="associacio__cta-bullets">
          <li>{t("associacio.cta.bullet1")}</li>
          <li>{t("associacio.cta.bullet2")}</li>
        </ul>
        <NavLink to="/memberships">
          <Button buttonStyle="boton--primary--solid" buttonSize="boton--medium">
            {t("associacio.cta.button")}
          </Button>
        </NavLink>
      </div>

      {/* Des de 2014 */}
      <div className="associacio__since">
        <OutlineHeading as="h2" tone="light" className="associacio__since-title">
          {t("associacio.since.title")}
        </OutlineHeading>
        <div className="associacio__since-body">
          <p>{t("associacio.since.text")}</p>
          <NavLink to="/socis">
            <Button buttonStyle="boton--primary--solid" buttonSize="boton--small">
              {t("associacio.since.button")}
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Els nostres principis */}
      <div className="associacio__principis">
        <OutlineHeading as="h2">{t("associacio.principis.title")}</OutlineHeading>
        <div className="associacio__principis-band">
          {[1, 2, 3].map((n) => (
            <OutlineHeading key={n} as="span" tone="light" className="associacio__principis-number">
              {n}
            </OutlineHeading>
          ))}
        </div>
        <div className="associacio__principis-cols">
          {[1, 2, 3].map((n) => (
            // TODO copy
            <p key={n}>
              Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
              rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
            </p>
          ))}
        </div>
      </div>

      {/* Banda de estadísticas */}
      <div className="associacio__stats" role="list">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            role="listitem"
            className="associacio__stat"
            style={{ "--stat-color": stat.color }}
          >
            <span className="associacio__stat-label">{t(`associacio.stats.${stat.key}`)}</span>
            <span className="associacio__stat-value">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Els nostres grups de treball */}
      <div className="associacio__grups">
        <OutlineHeading as="h2">{t("associacio.grups.title")}</OutlineHeading>
        <div className="associacio__grups-cta">
          {/* TODO copy */}
          <p>
            Lorem ipsum dolor sit amet, tincidunt sit amet, honcus cursus
            urna. Nulla semper tortor a pretium suscipit.
          </p>
          <a href={`mailto:${AMEBA_EMAIL}`}>
            <Button buttonStyle="boton--primary--solid" buttonSize="boton--small">
              {t("associacio.grups.button")}
            </Button>
          </a>
        </div>
        <div className="associacio__grups-grid">
          {WORK_GROUPS.map((key) => (
            <div key={key} className="associacio__grup" aria-hidden="false">
              <div className="associacio__grup-circle" aria-hidden="true" />
              <OutlineHeading as="h3">{t(`associacio.grups.${key}.title`)}</OutlineHeading>
              {/* TODO copy */}
              <p>
                Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
                rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Associacio;
