import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CardGrid.css";
import { createLastRowIterator, isCORSInactive } from "../../utils/utils";
import PlusButton from "../button/PlusButton";
import { ReactFitty } from "react-fitty";
import styled from "styled-components";

export default function CardGrid(props) {
  const { isAmebaDJ = false } = props; //Pendiente recibir si es entrevista por props
  const { support = [] } = useSelector((state) => state.data);

  const TitleStyled = styled.div`
    position: absolute;
    font-family: "Bebas Neue";
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #fae6c5;
    z-index: 999;
    padding: 20px;
    font-weight: 800;
    font-style: italic;
  `;

  const filteredArtists =
    isAmebaDJ && !!support.length
      ? support.filter((artist) => artist.is_ameba_dj === true)
      : support.filter((artist) => artist.is_ameba_dj === false) || support;

  const cardGenerator =
    !!filteredArtists.length &&
    filteredArtists.map((data) => {
      const { id = 0, images = [], name = "", tags = [] } = data;
      return (
        <div className="fullcard" key={id}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: isAmebaDJ ? "/booking/" + id : "/support/" + id,
              aboutProps: data,
            }}
          >
            <div className="cardSupport">
              <TitleStyled>
                <ReactFitty maxSize={200}>{name}</ReactFitty>
              </TitleStyled>
              <img
                src={isCORSInactive() + images[0]}
                alt={name}
                className="cardSupportImgTop"
              />
              <div className="cardSupportPlusBox">
                <PlusButton plusStyle="plus--obscure" plusSize="plus--big" />
              </div>
              {!!tags.length && <div className="cardTagBox">{tags[0]}</div>}
            </div>
          </NavLink>
        </div>
      );
    });

  return (
    <div className="cardSupportDeck">
      {support.length > 0 && cardGenerator}
      {cardGenerator &&
        createLastRowIterator(support, 550).map((n, index) => (
          <i aria-hidden={true} key={index}></i>
        ))}
    </div>
  );
}
