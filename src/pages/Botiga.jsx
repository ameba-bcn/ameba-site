import React from "react";
import BotigaGeneral from "../components/botiga/BotigaGeneral";
import useDataStore from "../stores/useDataStore";
import ProductBanner from "../components/botiga/ProductBanner";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { deleteStringDecimals } from "../utils/utils";
import useMediaQuery from "../hooks/use-media-query";

function Botiga() {
  const { membership = [] } = useDataStore();
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery("(max-width:1163px)");
  const sociPreu = membership[0]?.price_range;

  return (
    <PageLayout
      className="Botiga"
      title={t("menu.botiga")}
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <div className="clickBanner">
        <NavLink
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/memberships",
          }}
        >
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
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
    </PageLayout>
  );
}

export default Botiga;
