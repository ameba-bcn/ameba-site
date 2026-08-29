import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useDataStore from "../stores/useDataStore";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import PageMeta from "../components/seo/PageMeta";
import SectionHero from "../components/ui/SectionHero";
import DotsRow from "../components/ui/DotsRow";
import CardGrid from "../components/ui/CardGrid";
import AmebaCard from "../components/ui/AmebaCard";
import LoadMoreButton from "../components/ui/LoadMoreButton";
import Button from "../components/button/Button";
import { formatPrice } from "../utils/utils";
import heroImage from "../assets/images/home/home4.jpg";
import usePageEnter from "../hooks/use-page-enter";
import "./Botiga.css";

const PAGE_SIZE = 12;

function Botiga() {
  const { botiga = [], isArtistsLoading, botigaError, fetchBotiga } = useDataStore();
  const [t] = useTranslation("translation");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleItems = botiga.slice(0, visibleCount);
  const rootRef = useRef(null);

  usePageEnter(rootRef, "shop");

  return (
    <PageLayout section="shop" promo loading={isArtistsLoading}>
      <PageMeta
        title="Botiga"
        description="Botiga d'AMEBA: merchandising, entrades i productes de l'Associació de Música Electrònica de Barcelona."
        url="/botiga"
      />
      <div ref={rootRef}>
      <SectionHero
        title={t("menu.shop")}
        section="shop"
        variant="mega"
        dotsPosition="end"
        titleColor="var(--color-cream)"
        image={heroImage}
        imageAlt={t("menu.shop")}
        lead={/* TODO copy */ "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        titleFit={false}
      >
        {/* TODO copy */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam
          sem, molestie sed orci nec, eleifend porta arcu.
        </p>
        <p className="section-hero__text-p--regular">
          Aliquam mi velit, tincidunt sit amet diam non, rhoncus cursus
          urna. Nulla semper tortor a pretium suscipit. Integer volutpat
          egestas arcu sit amet luctus.
        </p>
      </SectionHero>
      <hr className="botiga__hr--bleed-right" />
      <DotsRow className="botiga__hero-dots" />

      {botigaError ? (
        <div className="botiga-shop__state" role="alert">
          <p>{t("errors.general")}</p>
          <Button
            buttonStyle="boton--primary--solid"
            buttonSize="boton--medium"
            onClick={fetchBotiga}
          >
            {t("general.torna-ho-a-provar")}
          </Button>
        </div>
      ) : !isArtistsLoading && visibleItems.length === 0 ? (
        <div className="botiga-shop__state">{t("general.sense-resultats")}</div>
      ) : (
        <>
          <CardGrid>
            {visibleItems.map((item) => (
              <AmebaCard
                key={item.id}
                to={`/botiga/${item.id}`}
                image={item.images?.[0]}
                imageAlt={item.name}
                imageFit="contain"
                badge={item.price_range ? formatPrice(item.price_range) : null}
                title={item.name}
              />
            ))}
          </CardGrid>
          {visibleCount < botiga.length && (
            <LoadMoreButton
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            />
          )}
        </>
      )}
      </div>
    </PageLayout>
  );
}

export default Botiga;
