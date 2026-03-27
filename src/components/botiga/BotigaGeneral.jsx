import React from "react";
import { useNavigate } from "react-router-dom";
import { createLastRowIterator, formatPrice } from "./../../utils/utils";
import { MOBILE_NORMAL, MOBILE_SMALL } from "../../utils/constants";
import useMediaQuery from "../../hooks/use-media-query";
import useDataStore from "../../stores/useDataStore";
import AmebaCardTitle from "../ui/AmebaCardTitle";
import "./BotigaGeneral.css";

export default function BotigaGeneral() {
  const { botiga = [] } = useDataStore();
  const navigate = useNavigate();
  const isOneColumn = useMediaQuery("(max-width:1178px)");
  const isMobileNormal = useMediaQuery(MOBILE_NORMAL);
  const isMobileSmall = useMediaQuery(MOBILE_SMALL);

  const getTitleMaxSize = () => {
    if (isMobileSmall) return 24;
    if (isMobileNormal) return 32;
    return 50;
  };

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
                    <AmebaCardTitle
                      maxSize={getTitleMaxSize()}
                      singleLine
                      padding="0"
                    >
                      {data.name}
                    </AmebaCardTitle>
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
