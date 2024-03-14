import React from "react";
import { useSelector } from "react-redux";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import { StyledContacte } from "./Contacte.styles.jsx";

function Contacte() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useSelector((state) => state.data);
  return (
    <StyledContacte id="contacte">
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
          <a className="logTextosLink" href="mailto:info@ameba.cat">
            info@ameba.cat
          </a>
          <span>
            Associació de Música Electrònica de Barcelona - {t("footer.drets")}
          </span>
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="#F2C571"
      />
    </StyledContacte>
  );
}

export default Contacte;
