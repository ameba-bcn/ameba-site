import React from "react";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useDataStore from "../stores/useDataStore";
import "./Contacte.styles.css";

function Contacte() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useDataStore();

  return (
    <div className="contacte" id="contacte">
      <div className="contenedorContacto">
        <nav className="footer-links" aria-label={t("footer.nav-label")}>
          <div className="footer-links__col">
            <span className="footer-links__title">{t("menu.associacio")}</span>
            <NavLink to="/memberships">{t("menu.soci-menu")}</NavLink>
            <NavLink to="/socis">SOCI@S</NavLink>
          </div>
          <div className="footer-links__col">
            <span className="footer-links__title">{t("menu.lab")}</span>
            <NavLink to="/activitats">AGENDA</NavLink>
            <NavLink to="/gallery">{t("menu.arxiu")}</NavLink>
          </div>
          <div className="footer-links__col">
            <span className="footer-links__title">Info</span>
            <a href="#newsletter">{t("footer.newsletter")}</a>
            <NavLink to="/legal">Legal</NavLink>
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </div>
        </nav>
        <div className="newletterForm" id="newsletter">
          <NewsletterFormLayout />
        </div>
        <MediaLinks
          fcbk="amebabarcelona"
          insta="ameba_bcn"
          yout="channel/UCH5ssfBCmgJ1IDM-pSn2cEg"
          soundcloud="ameba-barcelona"
        />
        <div className="colabText">
          {t("footer.colab")}
          {collaborators.map((el) => {
            if (el.is_active)
              return (
                <img
                  src={el.image}
                  className="AjuntamentBcnImg"
                  alt="AjuntamentBcn"
                  key={el.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              );
          })}
        </div>
        <div className="endingText">
          <span>AMEBA {new Date().getFullYear()}©</span>
          <div className="styled-link">
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </div>
          <span>
            Associació de Música Electrònica de Barcelona - {t("footer.drets")}
            {" - "}
            <NavLink className="legal" to="/legal">
              Legal
            </NavLink>
          </span>
        </div>
      </div>
      <LettersMove
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="var(--color-naranja)"
      />
    </div>
  );
}

export default Contacte;
