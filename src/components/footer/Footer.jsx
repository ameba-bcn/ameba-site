import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AmebaLogo from "../ui/logo/AmebaLogo";
import Icon from "../ui/Icon";
import Button from "../button/Button";
import useDataStore from "../../stores/useDataStore";
import profileServices from "../../store/services/profile.services";
import { AMEBA_EMAIL } from "../../utils/constants";
import "./Footer.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIALS = [
  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/ameba_bcn" },
  { icon: "soundcloud", label: "SoundCloud", url: "https://soundcloud.com/ameba-barcelona" },
  { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/amebabarcelona" },
  { icon: "youtube", label: "YouTube", url: "https://www.youtube.com/channel/UCH5ssfBCmgJ1IDM-pSn2cEg" },
];

export default function Footer() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useDataStore();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { tone: "success"|"error", text }
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus({ tone: "error", text: t("newsletter.error") });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    profileServices
      .subscribeNewsletter(email)
      .then(() => {
        setStatus({ tone: "success", text: t("newsletter.success") });
        setEmail("");
      })
      .catch(() => {
        setStatus({ tone: "error", text: t("newsletter.error") });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <footer className="ameba-footer">
      <div className="ameba-footer__grid">
        <div className="ameba-footer__brand">
          <Link to="/" aria-label={t("footer.inici")} className="ameba-footer__logo">
            <AmebaLogo width={88} height={88} fill="var(--color-naranja)" />
          </Link>
          <p className="ameba-footer__tagline">{t("footer.tagline")}</p>
          <div className="ameba-footer__socials">
            {SOCIALS.map(({ icon, label, url }) => (
              <a key={icon} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon icon={icon} width="26" height="26" />
              </a>
            ))}
          </div>
        </div>

        <nav className="ameba-footer__nav" aria-label={t("menu.associacio")}>
          <h3>{t("menu.associacio")}</h3>
          <div className="ameba-footer__links">
            <NavLink to="/memberships">{t("footer.hazte-socio")}</NavLink>
            <NavLink to="/associacio/socis">{t("footer.socios")}</NavLink>
          </div>
        </nav>

        <nav className="ameba-footer__nav" aria-label={t("menu.lab")}>
          <h3>{t("menu.lab")}</h3>
          <div className="ameba-footer__links">
            <NavLink to="/lab">{t("footer.agenda")}</NavLink>
            <NavLink to="/festivals/arxiu">{t("footer.archivo")}</NavLink>
          </div>
        </nav>

        <div className="ameba-footer__news">
          <h3>{t("footer.newsletter")}</h3>
          <p>{t("newsletter.body")}</p>
          <form className="ameba-footer__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              aria-label="Email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus(null);
              }}
            />
            <Button
              type="submit"
              buttonStyle="boton--back-orange--solid"
              buttonSize="boton--medium"
              disabled={submitting}
              loading={submitting}
            >
              {t("newsletter.subscriute")}
            </Button>
          </form>
          <div
            className={`ameba-footer__status${status?.tone === "error" ? " ameba-footer__status--error" : ""}`}
          >
            {status?.text}
          </div>
          <div className="ameba-footer__legal-row">
            <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>
            <NavLink to="/legal" className="ameba-footer__legal-link">
              {t("footer.legal")}
            </NavLink>
          </div>
        </div>
      </div>

      <div className="ameba-footer__bottom">
        <span>AMEBA {new Date().getFullYear()} © · {t("footer.drets")}</span>
        <div className="ameba-footer__collab">
          <span>{t("footer.colab")}</span>
          {collaborators.map((el) =>
            el.is_active ? (
              <img
                key={el.name}
                src={el.image}
                alt={el.name}
                className="ameba-footer__collab-logo"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : null,
          )}
        </div>
      </div>
    </footer>
  );
}
