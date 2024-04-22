import React from "react";
import { MOBILE_SMALL } from "../../utils/constants";
import { StyledLink } from "../../styles/GlobalStyles";
import useMediaQuery from "../../hooks/use-media-query";
import TitleSection from "../layout/TitleSection";
import styled from "styled-components";

const StyledMainSoundSystem = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const StyledRowSoundSystem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-flow: row wrap;
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
  margin: 24px 0px;
  @media (max-width: 430px) {
    .image-col {
      min-width: 150px !important;
    }
    .description {
      min-width: 250px !important;
    }
  }
  @media (max-width: 1058px) {
    .image-row {
      align-items: center !important;
    }
  }
  .image-col {
    width: 100%;
    height: auto;
    max-width: 550px;
    min-width: 450px;
    text-align: center;
  }
  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }
  .description {
    min-width: 450px;
    text-align: left;
    margin-bottom: 12px;
  }
  .image-row {
    &.right {
      align-items: flex-end;
    }
    &.left {
      align-items: flex-start;
    }
    text-align: center;
    .image-col {
      width: 100%;
      height: auto;
      max-width: 550px;
      min-width: 450px;
    }
  }
  .image-wide {
    width: 100%;
  }
`;

const StyledSubTitleSoundSystem = styled.div`
  font-size: 42px;
  width: 100%;
  div,
  hr {
    width: 100%;
  }
  .title-section-support {
    line-height: 0.9em;
  }
  @media (max-width: 700px) {
    .title-section-support {
      font-size: 34px;
    }
  }
`;

const StyledLogoBoxSoundSystem = styled.div`
  margin: 48px 0px;
  img {
    max-width: 140px;
    width: 100%;
    margin: 6px 12px;
  }
  .ajuntament {
    max-width: 240px;
    width: 100%;
  }
  @media (max-width: 1058px) {
    img {
      max-width: 70px;
    }
    .ajuntament {
      max-width: 120px;
    }
  }
`;

const SoundSystem = () => {
  const isMobile = useMediaQuery(MOBILE_SMALL);
  return (
    <StyledMainSoundSystem>
      <StyledSubTitleSoundSystem>
        <TitleSection
          title={
            "SOUNDSYSTEM - SOSTENIBLE, PORTÁTIL Y ENERGÉTICAMENTE AUTOSUFICIENTE"
          }
        />
      </StyledSubTitleSoundSystem>

      <StyledRowSoundSystem>
        <div className="description column">
          Pororoca Eco Sound System es un equipo de sonido de alta calidad y una
          cabina de DJ, que funciona exclusivamente con baterías que trabajan a
          través de energía solar o mecánica, sin necesidad de otros equipos
          electrógenos (a menudo alimentados por combustibles fósiles, como
          gasoil o gasolina).
          <br />
          <br />
          Esta es una iniciativa pionera en España desarrollada por Claros
          Sonidos con la colaboración de AMEBA, Flea Market Barcelona y el
          Ayuntamiento de Barcelona. El fin de Pororoca Eco Sound System es
          transmitir un mensaje de sostenibilidad, promover la reducción de
          emisiones y fomentar el autoconsumo energético a través de la música y
          la cultura.
          <br />
          <br />
          El equipo humano implicado en la creación del sound system ha aplicado
          la máxima investigación y desarrollo para obtener un sonido de alta
          fidelidad utilizando componentes profesionales de gran calidad (Faital
          Pro, Beyma…). Paralelamente, el hecho de que el dispositivo esté unido
          a unas bicicletas con ruedas eléctricas permite su desplazamiento a
          todas partes de la ciudad de manera muy cómoda. Finalmente, el diseño
          estético también ha sido una parte muy importante para que discreción,
          elegancia y funcionalidad le permitan encajar en todo tipo de espacios
          y eventos.
        </div>
        <div className="image-row column right">
          <img
            className="image-col"
            src="https://ameba.cat/media/images/Pororoca2.png"
            alt=""
          />
        </div>
      </StyledRowSoundSystem>

      <StyledSubTitleSoundSystem>
        <TitleSection title={"BENEFICIOS AMBIENTALES Y SOCIALES"} />
      </StyledSubTitleSoundSystem>

      <StyledRowSoundSystem>
        <div className="description column">
          <ul>
            <li>No se hace uso de ningún grupo electrógeno.</li>
            <li>
              Se opera mediante autoconsumo energético, convirtiéndose en el
              primer equipo de sonido sostenible de España.
            </li>
            <li>
              La carga de la batería se produce únicamente con energía verde y/o
              renovable.
            </li>
            <li>
              Se trabaja con profesionales locales reconocidos y de proximidad.
            </li>
            <li>Compra responsable adquiriendo maderas certificadas FSC.</li>
            <li>Certificación de AENOR.</li>
          </ul>
        </div>
        <div className="image-row column right">
          <img
            className="image-col"
            src="https://ameba.cat/media/images/Pororoca1.png"
            alt=""
          />
        </div>
      </StyledRowSoundSystem>

      {!isMobile && (
        <>
          {" "}
          <StyledSubTitleSoundSystem>
            <TitleSection title={"DIAGRAMA SISTEMA COMPLETO"} />
          </StyledSubTitleSoundSystem>
          <StyledRowSoundSystem>
            <img
              className="image-wide"
              src="https://ameba.cat/media/images/PororocaDiagrama.png"
              alt=""
            />
          </StyledRowSoundSystem>
        </>
      )}

      <StyledRowSoundSystem>
        <div className="description">
          Si quieres conocer más acerca de este proyecto escríbenos al instagram
          de{" "}
          <StyledLink>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/claros.sonidos/"
            >
              Taller Claro
            </a>
          </StyledLink>{" "}
          o por mail a{" "}
          <StyledLink>
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </StyledLink>
        </div>
      </StyledRowSoundSystem>

      <StyledLogoBoxSoundSystem>
        <a
          href="https://clarossonidos.wordpress.com/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            className="logo"
            src="https://ameba.cat/media/images/taller-claro.png"
            alt=""
          />
        </a>
        <a href="https://ameba.cat/" rel="noreferrer" target="_blank">
          <img
            className="logo"
            src="https://ameba.cat/media/images/ameba-logo-alpha.png"
            alt=""
          />
        </a>
        <a href="https://fleamarketbcn.com/" rel="noreferrer" target="_blank">
          <img
            className="logo"
            src="https://ameba.cat/media/images/LogoFlea.png"
            alt=""
          />
        </a>
        <img
          className="logo ajuntament"
          src="/ameba-site/AjuntamentBcn.png"
          alt=""
        />
      </StyledLogoBoxSoundSystem>
    </StyledMainSoundSystem>
  );
};

export default SoundSystem;
