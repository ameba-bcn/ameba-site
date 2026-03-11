import React from "react";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import "./Contacte.styles.css";
import "../styles/GlobalStyles.css";
import { NavLink } from "react-router-dom";
import useDataStore from "../stores/useDataStore";

function Contacte() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useDataStore();

  return (
    <div className="contacte" id="contacte">
      <div className="contenedorContacto">
        <div className="newletterForm">
          <NewsletterFormLayout />
        </div>
        <MediaLinks
          fcbk="amebabarcelona"
          insta="ameba_bcn"
          twit="ameba_bcn"
          yout="channel/UCH5ssfBCmgJ1IDM-pSn2cEg"
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
                />
              );
          })}
        </div>
        <div className="endingText">
          <span>AMEBA 2022©</span>
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
        className="lettersMoveDiv"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="#F2C571"
      />
    </div>
  );
}

export default Contacte;
