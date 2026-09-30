import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import PageMeta from "../components/seo/PageMeta";
import Button from "../components/button/Button";
import { NAV_SECTIONS } from "../components/navbar/navSections";
import "./NotFound.css";

export default function NotFound() {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageLayout section="notfound">
      <PageMeta title={t("notFound.title")} url={location.pathname} />
      <div className="not-found__body">
        <div className="not-found__dots">
          <span
            className="not-found__dot"
            style={{ backgroundColor: "var(--color-naranja)" }}
          />
          <span
            className="not-found__dot"
            style={{ backgroundColor: "var(--color-rojo)" }}
          />
          <span
            className="not-found__dot"
            style={{ backgroundColor: "var(--color-amarillo)" }}
          />
          <span
            className="not-found__dot"
            style={{ backgroundColor: "var(--color-cream)" }}
          />
        </div>

        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__headline">{t("notFound.headline")}</h2>
        <p className="not-found__text">
          {t("notFound.text-pre")}{" "}
          <span className="not-found__path">{location.pathname}</span>.{" "}
          {t("notFound.text-post")}
        </p>

        <div className="not-found__actions">
          <Button
            buttonStyle="boton--back-orange--solid"
            buttonSize="boton--medium"
            onClick={() => navigate("/")}
          >
            {t("notFound.go-home")}
          </Button>
          <Button
            buttonStyle="boton--primary--solid"
            buttonSize="boton--medium"
            onClick={() => navigate(-1)}
          >
            {t("notFound.go-back")}
          </Button>
        </div>

        <div className="not-found__links">
          <h3 className="not-found__links-title">
            {t("notFound.links-title")}
          </h3>
          <div className="not-found__tiles">
            {NAV_SECTIONS.map((item) => (
              <Link key={item.key} to={item.to} className="not-found__tile">
                <span
                  className="not-found__tile-label"
                  style={{ color: `var(${item.chip})` }}
                >
                  {t(`menu.${item.key}`)}
                </span>
                <span
                  className="not-found__tile-dot"
                  style={{ backgroundColor: `var(${item.chip})` }}
                />
              </Link>
            ))}
          </div>
        </div>

        <p className="not-found__contact">
          {t("notFound.contact-pre")}{" "}
          <a href="mailto:info@ameba.cat">info@ameba.cat</a>
        </p>
      </div>
    </PageLayout>
  );
}
