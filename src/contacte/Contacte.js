import React from "react";
// import Container from '@material-ui/core/Container';
// import NewsletterForm from './NewsletterForm';
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import "./Contacte.css";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
//Falta Mixcloud & Twitch

function Contacte() {
  const [t] = useTranslation("translation");
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
          <img
            src={process.env.PUBLIC_URL + "/AjuntamentBcn.png"}
            className="AjuntamentBcnImg"
            alt="AjuntamentBcn"
          />
        </div>
        <div className="endingText">
          AMEBA 2022©
          <br />
          <a className="linkEndingText" href="mailto:info@ameba.cat">info@ameba.cat</a>
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
