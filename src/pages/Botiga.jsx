import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../stores/useDataStore";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import PageMeta from "../components/seo/PageMeta";
import SectionHero from "../components/ui/SectionHero";
import DotsRow from "../components/ui/DotsRow";
import CardGrid from "../components/ui/CardGrid";
import AmebaCard from "../components/ui/AmebaCard";
import LoadMoreButton from "../components/ui/LoadMoreButton";
import ProductBanner from "../components/botiga/ProductBanner";
import Button from "../components/button/Button";
import { formatPrice, deleteStringDecimals } from "../utils/utils";
import useMediaQuery from "../hooks/use-media-query";
import "./Botiga.css";

const PAGE_SIZE = 12;

function Botiga() {
  const { botiga = [], membership = [], isArtistsLoading, botigaError, fetchBotiga } =
    useDataStore();
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery("(max-width:1163px)");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sociPreu = membership[0]?.price_range;
  const visibleItems = botiga.slice(0, visibleCount);

  return (
    <PageLayout section="shop" promo loading={isArtistsLoading}>
      <PageMeta
        title="Botiga"
        description="Botiga d'AMEBA: merchandising, entrades i productes de l'Associació de Música Electrònica de Barcelona."
        url="/botiga"
      />
      <SectionHero
        title={t("menu.botiga")}
        section="shop"
        image="https://ameba.cat/AmebaPortadaDesktop.jpg"
        imageAlt={t("menu.botiga")}
        lead={/* TODO copy */ "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      >
        {/* TODO copy */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam
          sem, molestie sed orci nec, eleifend porta arcu.
        </p>
      </SectionHero>
      <hr />
      <DotsRow />

      <div className="clickBanner">
        <NavLink style={{ textDecoration: "none" }} to="/memberships">
          <ProductBanner
            title={
              isMobile
                ? t("banners.soci-curt")
                : `${t("banners.soci-llarg-pt1")}${deleteStringDecimals(
                    sociPreu,
                  )}${t("banners.soci-llarg-pt2")}`
            }
          />
        </NavLink>
      </div>

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
    </PageLayout>
  );
}

export default Botiga;
