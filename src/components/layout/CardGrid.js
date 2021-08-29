import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./CardGrid.css";
import { isCORSInactive } from "../../utils/utils";
import PlusButton from "../button/PlusButton";

export default function CardGrid(props) {
  const { isInterview } = props; //Pendiente recibir si es entrevista por props
  const data = useSelector((state) => state.data);
  const { support = [] } = data;

  const cardGenerator =
    support.length > 0
      ? support.map((data) => {
          const { id = 0, images = [], name = "" } = data;
          return (
            <div className="fullcard" key={id}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/booking/" + id,
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
                    <PlusButton
                      plusStyle="plus--obscure"
                      plusSize="plus--big"
                    />
                  </div>
                  <div className="cardTagBox">DJ</div>
                </div>
              </NavLink>
            </div>
          );
        })
      : null;

  return (
    <div className="cardSupportDeck">{support.length > 0 && cardGenerator}</div>
  );
}
