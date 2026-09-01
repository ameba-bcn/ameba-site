import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import { formatPrice, formatDateToHour } from "../../utils/utils";
import { sanitizeHTML } from "../../utils/sanitize";
import { formatDayLine } from "../../utils/eventDateLabels";
import { buildEventJsonLd } from "../../utils/eventJsonLd";
import useCartStore from "../../stores/useCartStore";
import useProfileStore from "../../stores/useProfileStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import DotsRow from "../../components/ui/DotsRow";
import CardViewButton from "../../components/cardView/CardViewButton";
import CartToast from "../../components/toast/CartToast";
import "./LabDetail.css";

function LabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("translation");
  const lang = i18next.language === "es" ? "es" : "ca";
  const { addToCart } = useCartStore();
  const { user_profile = "" } = useProfileStore();
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

  const jsonLd = useMemo(() => buildEventJsonLd(event, id, "lab"), [event, id]);

  const eventName = event?.header || event?.name || "";
  const hero = event?.images?.[0];
  const portrait = event?.images?.[1];
  const description = event?.description ? sanitizeHTML(event.description) : "";

  const entrada = event?.cancelled
    ? t("lab.cancellat")
    : event?.price === 0 || event?.price === "0" || event?.price === "0.00"
      ? t("lab.gratuita")
      : event?.price
        ? formatPrice(event.price)
        : null;

  const handleAddToCart = () => {
    const variants = event?.variants || [];
    if (variants.length === 0) return;
    addToCart(variants[0].id).then(() => {
      toast(<CartToast />, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "toast-black-background",
      });
      navigate(user_profile === "LOGGED" ? "/checkout" : "/login");
    });
  };

  if (!loading && !eventName) {
    return (
      <PageLayout section="lab" promo>
        <PageMeta title={t("menu.lab")} url={`/lab/${id}`} />
        <div className="lab-detail__not-found">
          <p>{t("errors.linkBuit1")}</p>
          <p>{t("errors.linkBuit2")}</p>
          <Link to="/lab" className="lab-detail__back-link">
            {t("lab.torna")}
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout section="lab" promo loading={loading}>
      {!loading && eventName && (
        <PageMeta
          title={eventName}
          description={description ? description.replace(/<[^>]+>/g, "").slice(0, 200) : undefined}
          image={hero || undefined}
          url={`/lab/${id}`}
          type="event"
          jsonLd={jsonLd}
        />
      )}
      {!loading && eventName && (
        <div className="lab-detail">
          <nav aria-label={t("lab.breadcrumb")} className="lab-detail__breadcrumb">
            <Link to="/">AMEBA</Link>
            <span>|</span>
            <Link to="/lab">{t("menu.lab")}</Link>
            {event.type && (
              <>
                <span>|</span>
                <Link to={`/lab?tipus=${encodeURIComponent(event.type)}`}>{event.type}</Link>
              </>
            )}
            <span>|</span>
            <span>{eventName}</span>
          </nav>

          <section className="lab-detail__hero">
            <div className="lab-detail__hero-left">
              <DotsRow count={7} className="lab-detail__dots" />
              <h1 className="lab-detail__title">{eventName}</h1>

              <dl className="lab-detail__info">
                {event.address && (
                  <div>
                    <dt>{t("lab.localitzacio")}:</dt>
                    <dd>{event.address}</dd>
                  </div>
                )}
                {event.datetime && (
                  <div>
                    <dt>{t("lab.dia")}:</dt>
                    <dd>{formatDayLine(event.datetime, lang)}</dd>
                  </div>
                )}
                {event.datetime && (
                  <div>
                    <dt>{t("lab.horari")}:</dt>
                    <dd>{formatDateToHour(event.datetime).replace(":", ".")}h</dd>
                  </div>
                )}
                {event.tallerista && (
                  <div>
                    <dt>{t("lab.tallerista")}:</dt>
                    <dd>{event.tallerista}</dd>
                  </div>
                )}
                {entrada && (
                  <div>
                    <dt>{t("lab.entrada")}:</dt>
                    <dd>{entrada}</dd>
                  </div>
                )}
              </dl>

              <div className="lab-detail__cta lab-detail__cta--hero">
                <CardViewButton
                  type="ACTIVITAT"
                  price={event.price}
                  stock={event.stock}
                  cancelled={event.cancelled}
                  datetime={event.datetime}
                  maps_url={event.maps_url}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>

            <div className="lab-detail__hero-right">
              {hero ? (
                <img src={hero} alt={eventName} className="lab-detail__hero-image" />
              ) : (
                <div className="lab-detail__hero-placeholder" aria-hidden="true" />
              )}
            </div>
          </section>

          <section className="lab-detail__promo">
            <p>{t("lab.promo-text")}</p>
            <Link to="/memberships" className="lab-detail__badge">
              {t("footer.hazte-socio")}
            </Link>
          </section>

          <section className="lab-detail__body">
            <div className="lab-detail__intro">
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
              <div className="lab-detail__cta">
                <CardViewButton
                  type="ACTIVITAT"
                  price={event.price}
                  stock={event.stock}
                  cancelled={event.cancelled}
                  datetime={event.datetime}
                  maps_url={event.maps_url}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>

            <div className="lab-detail__portrait">
              {portrait ? (
                <img src={portrait} alt="" className="lab-detail__portrait-image" />
              ) : (
                <div className="lab-detail__portrait-placeholder" aria-hidden="true" />
              )}
              {event.tallerista && (
                <span className="lab-detail__portrait-caption">
                  {event.tallerista} · {t("lab.retrat")}
                </span>
              )}
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
}

export default LabDetail;
