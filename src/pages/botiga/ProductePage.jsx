import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import useCartStore from "../../stores/useCartStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import CardView from "../../components/cardView/CardView";
import EmbeddedSpinner from "../../components/spinner/EmbeddedSpinner";

const ProductePage = () => {
  const { id } = useParams();
  const [t] = useTranslation("translation");
  const { addToCart } = useCartStore();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}articles/${id}/`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.warn("ERROR: ", err);
      });
  }, [id]);

  const handleAddClick = (size) => {
    const variant = productData.variants?.find(
      (x) => x.attributes[0]?.value?.toLowerCase() === size.toLowerCase()
    );
    if (variant?.id) {
      addToCart(variant.id);
    }
  };

  const noData = Object.keys(productData).length === 0;

  return (
    <PageLayout
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      {loading ? (
        <EmbeddedSpinner alone />
      ) : noData ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <br />
          {t("errors.linkBuit1")}
          <br />
          <br />
          {t("errors.linkBuit2")}
          <br />
          <br />
        </div>
      ) : (
        <CardView
          productData={productData}
          kind="producte"
          handleAddClick={handleAddClick}
        />
      )}
    </PageLayout>
  );
};

export default ProductePage;
