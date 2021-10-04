import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CardGrid.css";
import { createLastRowIterator, isCORSInactive } from "../../utils/utils";
import PlusButton from "../button/PlusButton";

export default function CardGrid(props) {
  const { isAmebaDJ = false } = props; //Pendiente recibir si es entrevista por props
  const { support = [] } = useSelector((state) => state.data);

  const filteredArtists =
    isAmebaDJ && !!support.length
      ? support.filter((artist) => artist.is_ameba_dj === true)
      : support;

  const cardGenerator =
    !!filteredArtists.length &&
    filteredArtists.map((data) => {
      const { id = 0, images = [], name = "" } = data;
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
              <img
                src={isCORSInactive() + images[0]}
                alt={name}
                className="cardSupportImgTop"
              />
              <div className="cardSupportTitle">{name}</div>
              <div className="cardSupportPlusBox">
                <PlusButton plusStyle="plus--obscure" plusSize="plus--big" />
              </div>
              <div className="cardTagBox">DJ</div>
            </div>
          </NavLink>
        </div>
      );
    });

  return (
    <div className="cardSupportDeck">
      {support.length > 0 && cardGenerator}
      {cardGenerator &&
        createLastRowIterator(support, 550).map((i) => (
          <i aria-hidden={true} key={i}></i>
        ))}
    </div>
  );
}
