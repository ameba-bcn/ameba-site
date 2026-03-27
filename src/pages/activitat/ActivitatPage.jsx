import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import useCartStore from "../../stores/useCartStore";
import useProfileStore from "../../stores/useProfileStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import CardView from "../../components/cardView/CardView";
import EmbeddedSpinner from "../../components/spinner/EmbeddedSpinner";

const ActivitatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [t] = useTranslation("translation");
  const { addToCart } = useCartStore();
  const { user_profile = "" } = useProfileStore();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}events/${id}/`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.warn("ERROR: ", err);
      });
  }, [id]);

  const handleAddClick = () => {
    const { variants = [] } = productData;
    if (variants.length === 0) return;
    addToCart(variants[0].id).then(() => {
      const checkoutRedirect =
        user_profile === "LOGGED" ? "/checkout" : "/login";
      navigate(checkoutRedirect);
    });
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
          kind="activitat"
          handleAddClick={handleAddClick}
        />
      )}
    </PageLayout>
  );
};

export default ActivitatPage;
