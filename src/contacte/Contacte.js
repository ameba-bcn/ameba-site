import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import { StyledContacte } from "./Contacte.styles.jsx";
import { StyledLink } from "../styles/GlobalStyles.jsx";
import { Redirect } from "react-router";

function Contacte() {
  const [t] = useTranslation("translation");
  const [redirect, setRedirect] = useState(false);
  const { collaborators = [] } = useSelector((state) => state.data);

  if (redirect) {
    return redirect ? <Redirect to="/legal" /> : null;
  }

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
          <StyledLink>
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </StyledLink>
          <span>
            Associació de Música Electrònica de Barcelona - {t("footer.drets")}
            {" - "}
            <span className="legal" onClick={() => setRedirect(true)}>
              Legal
            </span>
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
