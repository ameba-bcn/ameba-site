import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import useCartStore from "../../stores/useCartStore";
import useProfileStore from "../../stores/useProfileStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import CardView from "../../components/cardView/CardView";
import EmbeddedSpinner from "../../components/spinner/EmbeddedSpinner";
import PageMeta from "../../components/seo/PageMeta";

function buildEventJsonLd(data) {
  if (!data || !data.name) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: data.header || data.name,
    url: `https://ameba.cat/activitats/${data.id}`,
    organizer: {
      "@type": "Organization",
      name: "AMEBA — Associació de Música Electrònica de Barcelona",
      url: "https://ameba.cat",
    },
  };
  if (data.datetime) {
    ld.startDate = data.datetime;
  }
  if (data.address) {
    ld.location = {
      "@type": "Place",
      name: data.address,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressRegion: "Catalunya",
        addressCountry: "ES",
      },
    };
  }
  if (data.images?.length > 0) {
    ld.image = data.images;
  }
  if (data.cancelled) {
    ld.eventStatus = "https://schema.org/EventCancelled";
  } else {
    ld.eventStatus = "https://schema.org/EventScheduled";
  }
  ld.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";
  return ld;
}

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
  const eventName = productData.header || productData.name || "";
  const eventDescription = productData.description
    ? productData.description.replace(/<[^>]+>/g, "").slice(0, 200)
    : "";
  const eventImage = productData.images?.[0];
  const eventJsonLd = useMemo(
    () => buildEventJsonLd(productData),
    [productData],
  );

  return (
    <PageLayout
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      {!loading && !noData && (
        <PageMeta
          title={eventName}
          description={eventDescription || undefined}
          image={eventImage || undefined}
          url={`/activitats/${id}`}
          type="event"
          jsonLd={eventJsonLd}
        />
      )}
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
