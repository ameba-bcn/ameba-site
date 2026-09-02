import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import dataService from "../../store/services/data.service";
import { AMEBA_EMAIL } from "../../utils/constants";
import { POLICIES, DADES } from "../../content/legal";
import "./Legal.css";

function formatMonthYear(iso, lang) {
  const date = new Date(iso);
  const locale = lang === "es" ? "es" : "ca";
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  return `${month} ${date.getFullYear()}`.toUpperCase();
}

function Legal() {
  const { t, i18n } = useTranslation("translation");
  const [documents, setDocuments] = useState([]);
  const [openPolicy, setOpenPolicy] = useState(0);

  useEffect(() => {
    dataService.getLegal().then((res) => setDocuments(res.data));
  }, []);

  const lastUpdated = useMemo(() => {
    if (!documents.length) return null;
    const latest = documents.reduce(
      (max, doc) => (doc.updated > max ? doc.updated : max),
      documents[0].updated,
    );
    return formatMonthYear(latest, i18n.language);
  }, [documents, i18n.language]);

  return (
    <PageLayout section="legal">
      <PageMeta
        title={t("legal.meta-title")}
        description={t("legal.meta-description")}
        url="/legal"
      />
      <div className="legal-page">
        <nav aria-label={t("compte.breadcrumb")} className="legal-page__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <span>{t("legal.eyebrow")}</span>
        </nav>

        <div className="legal-page__hero">
          <div className="legal-page__hero-main">
            <div className="legal-page__dots">
              <span className="legal-page__dot" />
              <span className="legal-page__dot" />
              <span className="legal-page__dot" />
            </div>
            <h1 className="legal-page__title">{t("legal.hero-title")}</h1>
            <p className="legal-page__lead">{t("legal.hero-lead")}</p>
          </div>
          {lastUpdated && (
            <div className="legal-page__updated">
              <span className="legal-page__updated-label">
                {t("legal.updated-label")}
              </span>
              <span className="legal-page__updated-value">{lastUpdated}</span>
            </div>
          )}
        </div>

        <div className="legal-page__split">
          <aside className="legal-page__side">
            <nav className="legal-page__nav" aria-label={t("legal.nav-aria")}>
              <a href="#documents">
                {t("legal.nav-documents")}
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#politiques">
                {t("legal.nav-policies")}
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#dades">
                {t("legal.nav-dades")}
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#legal-contacte">
                {t("legal.nav-contacte")}
                <span aria-hidden="true">↓</span>
              </a>
            </nav>

            <div className="legal-page__help">
              <span className="legal-page__help-title">{t("legal.help-title")}</span>
              <p>{t("legal.help-text")}</p>
              <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>
            </div>
          </aside>

          <div className="legal-page__main">
            <section id="documents" className="legal-page__section">
              <div className="legal-page__section-head">
                <h2>{t("legal.documents-title")}</h2>
                <span className="legal-page__section-hint">
                  {t("legal.documents-hint")}
                </span>
              </div>

              {documents.length === 0 ? (
                <p className="legal-page__empty">{t("legal.documents-empty")}</p>
              ) : (
                <div className="legal-page__doc-list">
                  {documents.map((doc) => (
                    <a
                      key={doc.file}
                      className="legal-page__doc"
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("legal.doc-aria", { title: doc.title })}
                    >
                      <span className="legal-page__doc-badge">PDF</span>
                      <span className="legal-page__doc-info">
                        <span className="legal-page__doc-title">{doc.title}</span>
                        {doc.description && (
                          <span className="legal-page__doc-desc">
                            {doc.description}
                          </span>
                        )}
                        <span className="legal-page__doc-meta">
                          PDF
                          {doc.size ? ` · ${doc.size}` : ""}
                          {doc.updated
                            ? ` · ${formatMonthYear(doc.updated, i18n.language)}`
                            : ""}
                        </span>
                      </span>
                      <span className="legal-page__doc-cta">
                        {t("legal.doc-download")}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section id="politiques" className="legal-page__section">
              <h2>{t("legal.policies-title")}</h2>
              <div className="legal-page__accordion">
                {POLICIES.map((key, i) => {
                  const isOpen = openPolicy === i;
                  return (
                    <div key={key} className="legal-page__accordion-item">
                      <button
                        type="button"
                        onClick={() => setOpenPolicy(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="legal-page__accordion-trigger"
                      >
                        <span>{t(`legal.policy-${key}-title`)}</span>
                        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="legal-page__accordion-body">
                          <p>{t(`legal.policy-${key}-body`)}</p>
                          <span className="legal-page__accordion-updated">
                            {t("legal.policy-updated")}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section id="dades" className="legal-page__section">
              <h2>{t("legal.dades-title")}</h2>
              <div className="legal-page__cards">
                {DADES.map((key) => (
                  <div
                    key={key}
                    className={`legal-page__card legal-page__card--${key}`}
                  >
                    <span className="legal-page__card-title">
                      {t(`legal.dades-${key}-title`)}
                    </span>
                    <p>{t(`legal.dades-${key}-text`)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="legal-contacte" className="legal-page__contact">
              <div className="legal-page__contact-info">
                <span className="legal-page__contact-name">
                  {t("legal.contacte-name")}
                </span>
                <span className="legal-page__contact-address">
                  {t("legal.contacte-address")}
                  <br />
                  {t("legal.contacte-registre")}
                </span>
              </div>
              <a
                href={`mailto:${AMEBA_EMAIL}`}
                className="legal-page__contact-cta"
              >
                {t("legal.contacte-cta")}
              </a>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Legal;
