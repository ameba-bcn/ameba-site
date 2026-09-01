import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import { formatPrice, formatDateToHour } from "../../utils/utils";
import { sanitizeHTML } from "../../utils/sanitize";
import { formatDateChip, formatDayLine } from "../../utils/eventDateLabels";
import { buildEventJsonLd } from "../../utils/eventJsonLd";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import DotsRow from "../../components/ui/DotsRow";
import Icon from "../../components/ui/Icon";
import "./FestivalDetail.css";

function FestivalDetail() {
  const { id } = useParams();
  const [t, i18next] = useTranslation("translation");
  const lang = i18next.language === "es" ? "es" : "ca";
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEvent(null);
    axiosInstance
      .get(`${API_URL}events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.warn("ERROR: ", err))
      .finally(() => setLoading(false));
  }, [id]);

  const jsonLd = useMemo(() => buildEventJsonLd(event, id, "festivals"), [event, id]);

  const eventName = event?.header || event?.name || "";
  const banner = event?.images?.[0];
  // No dedicated poster/cartell field exists on EventDetail — reuse the same
  // banner image framed as the "Cartell" slot rather than inventing a second one.
  const poster = banner;
  const description = event?.description ? sanitizeHTML(event.description) : "";

  const entrada = event?.cancelled
    ? t("festivals.cancellat")
    : event?.price === 0 || event?.price === "0" || event?.price === "0.00"
      ? t("festivals.gratuita")
      : event?.price
        ? formatPrice(event.price)
        : null;

  if (!loading && !eventName) {
    return (
      <PageLayout section="festivals" promo>
        <PageMeta title={t("menu.festivals")} url={`/festivals/${id}`} />
        <div className="festival-detail__not-found">
          <p>{t("errors.linkBuit1")}</p>
          <p>{t("errors.linkBuit2")}</p>
          <Link to="/festivals" className="festival-detail__back-link">
            {t("festivals.torna")}
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout section="festivals" promo loading={loading}>
      {!loading && eventName && (
        <PageMeta
          title={eventName}
          description={description ? description.replace(/<[^>]+>/g, "").slice(0, 200) : undefined}
          image={banner || undefined}
          url={`/festivals/${id}`}
          type="event"
          jsonLd={jsonLd}
        />
      )}
      {!loading && eventName && (
        <div className="festival-detail">
          <nav aria-label={t("festivals.breadcrumb")} className="festival-detail__breadcrumb">
            <Link to="/">AMEBA</Link>
            <span>|</span>
            <Link to="/festivals">{t("menu.festivals")}</Link>
            <span>|</span>
            <span>{eventName}</span>
          </nav>

          <section className="festival-detail__hero">
            <div className="festival-detail__hero-left">
              <DotsRow count={6} className="festival-detail__dots" />
              <h1 className="festival-detail__title">{eventName}</h1>
            </div>
            <div className="festival-detail__hero-right">
              {event.datetime && (
                <div className="festival-detail__chip">{formatDateChip(event.datetime)}</div>
              )}
              {event.address && (
                <div className="festival-detail__venue">
                  <Icon icon="place" width="17" height="17" />
                  {event.address}
                </div>
              )}
            </div>
          </section>

          {banner && (
            <section aria-label={eventName} className="festival-detail__banner">
              <img src={banner} alt={eventName} className="festival-detail__banner-image" />
            </section>
          )}

          <section className="festival-detail__body">
            <div className="festival-detail__intro">
              <p>{t("festivals.boilerplate")}</p>
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>

            <div className="festival-detail__panel">
              <dl className="festival-detail__info">
                {event.address && (
                  <div>
                    <dt>{t("festivals.localitzacio")}:</dt>
                    <dd>{event.address}</dd>
                  </div>
                )}
                {event.datetime && (
                  <div>
                    <dt>{t("festivals.dia")}:</dt>
                    <dd>{formatDayLine(event.datetime, lang)}</dd>
                  </div>
                )}
                {event.datetime && (
                  <div>
                    <dt>{t("festivals.horari")}:</dt>
                    <dd>{formatDateToHour(event.datetime).replace(":", ".")}h</dd>
                  </div>
                )}
                {entrada && (
                  <div>
                    <dt>{t("festivals.entrada")}:</dt>
                    <dd>{entrada}</dd>
                  </div>
                )}
              </dl>

              <div className="festival-detail__poster">
                <div className="festival-detail__poster-label">{t("festivals.cartell")}:</div>
                {poster ? (
                  <img src={poster} alt="" className="festival-detail__poster-image" />
                ) : (
                  <div className="festival-detail__poster-placeholder" aria-hidden="true" />
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
}

export default FestivalDetail;
