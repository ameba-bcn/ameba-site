import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ExternalEvents.css";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import ExternalEvent from "../../components/externalEvents/ExternalEvent";
import axiosInstance from "../../axios";
import { API_URL, productQueryKind } from "../../utils/constants";
import useCartStore from "../../stores/useCartStore";
import { useLocation } from "react-router-dom";

const ExternalEvents = () => {
  const [t] = useTranslation("translation");
  const { addToCart } = useCartStore();
  const [productData, setProductData] = useState({});
  const [producteLoading, setProducteLoading] = useState(false);
  const location = useLocation();
  const value = Object.fromEntries(new URLSearchParams(location.search));
  const { id = "", kind = "" } = value;
  const { variants } = productData || {};
  // eslint-disable-next-line no-prototype-builtins
  const url_kinds = productQueryKind?.hasOwnProperty(kind)
    ? productQueryKind[kind]
    : "events";
  const noProductData = Object.keys(productData).length === 0;

  useEffect(() => {
    const url = `${API_URL}${url_kinds}/${id}/`;
    setProducteLoading(true);
    axiosInstance
      .get(url, {})
      .then((res) => {
        setProductData(res.data);
        setProducteLoading(false);
      })
      .catch((err) => {
        setProducteLoading(false);
        console.warn("ERROR: ", err);
      });
  }, [id, kind]);

  const handleAddClick = () => {
    addToCart(variants[0].id);
  };

  return (
    <PageLayout
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <div className="external-events__box">
        {producteLoading ? (
          <div className="external-events__error">
            <span className="spinner-border" />{" "}
          </div>
        ) : noProductData ? (
          <div className="external-events__error">
            <br />
            {t("errors.linkBuit1")}
            <br />
            <br />
            {t("errors.linkBuit2")}
            <br />
            <br />
          </div>
        ) : (
          <ExternalEvent
            productData={productData}
            handleAddClick={handleAddClick}
            kind={kind}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default ExternalEvents;
