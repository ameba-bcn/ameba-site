import React from "react";
import { useNavigate } from "react-router-dom";
import { createLastRowIterator, formatPrice } from "./../../utils/utils";
import useMediaQuery from "../../hooks/use-media-query";
import useDataStore from "../../stores/useDataStore";
import "./BotigaGeneral.css";

export default function BotigaGeneral() {
  const { botiga = [] } = useDataStore();
  const navigate = useNavigate();
  const isOneColumn = useMediaQuery("(max-width:1178px)");
  const cardGenerator =
    botiga.length > 0
      ? botiga.map((data) => {
          return (
            <div
              className="fullcardBotiga"
              key={data.id}
              onClick={() => navigate(`/botiga/${data.id}`)}
            >
              <div className="productCard">
                <div className="productImgFrame">
                  <img
                    className="productImgTop"
                    src={data.images[0]}
                    alt={data.name}
                  />
                </div>
                <div className="productCardBody">
                  <div className="botiga-general__title">
                    {data.name}
                  </div>
                  <div className="productCardPrice">
                    {formatPrice(data.price_range)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : null;

  return (
    <div className="productCardDeck">
      {cardGenerator}
      {cardGenerator &&
        !isOneColumn &&
        createLastRowIterator(botiga, 470).map((n, index) => (
          <i aria-hidden={true} key={index}></i>
        ))}
    </div>
  );
}
