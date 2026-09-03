import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../stores/useAuthStore";
import useDataStore from "../../stores/useDataStore";
import useCartStore from "../../stores/useCartStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import { sanitizeHTML } from "../../utils/sanitize";
import { isMemberCheckout } from "../../utils/utils";
import { STATS, BENEFITS, STEPS, FAQ } from "../../content/nouSoci";
import "./NouSoci.css";

const DOT_COLORS = ["negro", "naranja", "rojo", "amarillo"];

function NouSoci() {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const { membership = [] } = useDataStore();
  const { isLoggedIn } = useAuthStore();
  const { cart_data = {}, addToCart } = useCartStore();
  const { item_variants = [] } = cart_data;
  const hasMembershipInCart = isMemberCheckout(item_variants);

  if (membership.length === 0) {
    return (
      <PageLayout section="nou-soci">
        <PageMeta
          title={t("nouSoci.meta-title")}
          description={t("nouSoci.meta-description")}
          url="/associacio/nou-soci"
        />
        <div className="nou-soci nou-soci--empty">
          <p>{t("errors.general")}</p>
        </div>
      </PageLayout>
    );
  }

  const productData = membership[0] || {};
  const {
    images = [],
    description = "",
    price_range = "",
    variants = [],
    has_stock = true,
    stock,
  } = productData;
  // /subscriptions/ returns `variants` as bare variant ids, not expanded
  // objects (unlike the documented Variant shape) — handle both.
  const firstVariantId =
    typeof variants[0] === "object" ? variants[0]?.id : variants[0];
  const productSoldOut = has_stock === false || stock === 0;
  const checkoutRedirect = isLoggedIn ? "/checkout" : "/login";

  const handleCtaClick = () => {
    if (productSoldOut) return;
    if (hasMembershipInCart) {
      navigate(checkoutRedirect);
      return;
    }
    addToCart(firstVariantId).then(() => navigate(checkoutRedirect));
  };

  const ctaLabel = productSoldOut
    ? t("nouSoci.exhaurit")
    : hasMembershipInCart
      ? t("nouSoci.anar-cistella")
      : t("modal.afegir");

  return (
    <PageLayout section="nou-soci" flushBottom>
      <PageMeta
        title={t("nouSoci.meta-title")}
        description={t("nouSoci.meta-description")}
        url="/associacio/nou-soci"
      />
      <div className="nou-soci">
        <nav aria-label={t("compte.breadcrumb")} className="nou-soci__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <Link to="/associacio">{t("menu.associacio")}</Link>
          <span>|</span>
          <span>{t("nouSoci.eyebrow")}</span>
        </nav>

        <section className="nou-soci__hero">
          <div className="nou-soci__hero-main">
            <div className="nou-soci__dots">
              {DOT_COLORS.map((color) => (
                <span key={color} className={`nou-soci__dot nou-soci__dot--${color}`} />
              ))}
            </div>

            <h1 className="nou-soci__title">{t("nouSoci.title")}</h1>

            {description ? (
              <p
                className="nou-soci__lead"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            ) : (
              <p className="nou-soci__lead">{t("nouSoci.lead-fallback")}</p>
            )}

            <div className="nou-soci__stats">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.labelKey}>
                  {i > 0 && <span className="nou-soci__stats-sep" aria-hidden="true" />}
                  <span className="nou-soci__stat">
                    <span className="nou-soci__stat-value">{stat.value}</span>
                    <span className="nou-soci__stat-label">{t(stat.labelKey)}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <aside className="nou-soci__card">
            <div className="nou-soci__card-image">
              {images[0] ? (
                <img src={images[0]} alt="" />
              ) : (
                <div className="nou-soci__card-image-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="nou-soci__card-body">
              <div className="nou-soci__card-price-row">
                <span className="nou-soci__card-price-label">{t("nouSoci.quota-anual")}</span>
                <span className="nou-soci__card-price-value">{price_range}</span>
              </div>
              <p className="nou-soci__card-note">{t("nouSoci.quota-text")}</p>

              <ul className="nou-soci__card-bullets">
                <li>
                  <span className="nou-soci__card-bullet-dot nou-soci__card-bullet-dot--naranja" />
                  {t("nouSoci.bullet-carnet")}
                </li>
                <li>
                  <span className="nou-soci__card-bullet-dot nou-soci__card-bullet-dot--rojo" />
                  {t("nouSoci.bullet-assemblea")}
                </li>
                <li>
                  <span className="nou-soci__card-bullet-dot nou-soci__card-bullet-dot--amarillo" />
                  {t("nouSoci.bullet-directori")}
                </li>
              </ul>

              <button
                type="button"
                className="nou-soci__badge"
                onClick={handleCtaClick}
                disabled={productSoldOut}
              >
                {ctaLabel}
              </button>
              {hasMembershipInCart && (
                <span className="nou-soci__card-cta-note" aria-live="polite">
                  <NavLink to={checkoutRedirect}>{t("soci.disclaimer")}</NavLink>
                </span>
              )}
              <span className="nou-soci__card-secure">{t("nouSoci.pagament-segur")}</span>
            </div>
          </aside>
        </section>

        <section className="nou-soci__band nou-soci__band--negro">
          <div className="nou-soci__shell nou-soci__benefits">
            <div className="nou-soci__section-head">
              <h2 className="nou-soci__section-title">{t("nouSoci.que-inclou-title")}</h2>
              <span className="nou-soci__section-hint">{t("nouSoci.que-inclou-hint")}</span>
            </div>
            <div className="nou-soci__benefits-grid">
              {BENEFITS.map((key) => (
                <div key={key} className="nou-soci__benefit">
                  <span className="nou-soci__benefit-title">
                    {t(`nouSoci.benefit-${key}-title`)}
                  </span>
                  <p className="nou-soci__benefit-text">
                    {key === "projecte" ? (
                      <>
                        {t("nouSoci.benefit-projecte-text-pre")}{" "}
                        <Link to="/associacio/socis">{t("nouSoci.benefit-projecte-link")}</Link>
                        {t("nouSoci.benefit-projecte-text-post")}
                      </>
                    ) : (
                      t(`nouSoci.benefit-${key}-text`)
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nou-soci__steps">
          <h2 className="nou-soci__section-title">{t("nouSoci.com-funciona-title")}</h2>
          <div className="nou-soci__steps-grid">
            {STEPS.map((key, i) => (
              <div key={key} className="nou-soci__step">
                <span className="nou-soci__step-num">{i + 1}</span>
                <span className="nou-soci__step-body">
                  <span className="nou-soci__step-title">{t(`nouSoci.step-${key}-title`)}</span>
                  <span className="nou-soci__step-text">{t(`nouSoci.step-${key}-text`)}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="nou-soci__faq">
          <h2 className="nou-soci__section-title">{t("nouSoci.faq-title")}</h2>
          <div className="nou-soci__faq-grid">
            {FAQ.map((key) => (
              <div key={key} className="nou-soci__faq-item">
                <span className="nou-soci__faq-question">{t(`nouSoci.faq-${key}-q`)}</span>
                <span className="nou-soci__faq-answer">
                  {key === "carnet" ? (
                    <>
                      {t("nouSoci.faq-carnet-a-pre")}{" "}
                      <Link to="/compte/dades">{t("nouSoci.faq-carnet-a-link")}</Link>.
                    </>
                  ) : (
                    t(`nouSoci.faq-${key}-a`)
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="nou-soci__band nou-soci__band--naranja">
          <div className="nou-soci__shell nou-soci__closing">
            <div className="nou-soci__closing-text">
              <span className="nou-soci__closing-title">{t("nouSoci.closing-title")}</span>
              <span className="nou-soci__closing-lead">{t("nouSoci.closing-lead")}</span>
            </div>
            <button
              type="button"
              className="nou-soci__badge nou-soci__badge--closing"
              onClick={handleCtaClick}
              disabled={productSoldOut}
            >
              {ctaLabel}
            </button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default NouSoci;
