/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import "./Contacte.css";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

function Contacte() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useSelector((state) => state.data);
  return (
    <div className="bloqueContacto" id="contacte">
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
          AMEBA 2022©
          <br />
          <a className="linkEndingText" href="mailto:info@ameba.cat">
            info@ameba.cat
          </a>
          <br />
          Associació de Música Electrònica de Barcelona - {t("footer.drets")}
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
