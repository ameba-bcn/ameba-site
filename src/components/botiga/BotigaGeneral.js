import React, { useState, useEffect } from "react";
import "./BotigaGeneral.css";
import ProducteDialog from "./Producte";
import axiosInstance from "../../axios";
import {
  createLastRowIterator,
  formatPrice,
  isCORSInactive,
} from "./../../utils/utils";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactFitty } from "react-fitty";
import { useLocation } from "react-router-dom";

export const TitleStyled = styled.div`
  width: 75%;
  font-family: "Bebas Neue";
  font-weight: 300;
  font-style: italic;
  text-transform: uppercase;
  color: #fae6c5;
  text-align: left;
`;

export default function BotigaGeneral() {
  const [open, setOpen] = React.useState(false);
  let location = useLocation();
  const queryString = require("query-string");
  const value = queryString.parse(location.search);
  const externalId = value.id;
  const data = useSelector((state) => state.data);
  const { botiga = [] } = data;
  const [productData, getProductData] = useState([
    {
      id: 0,
      name: "",
      description: "",
      price: "",
      stock: 0,
      variants: [""],
      images: [""],
      is_active: false,
      discount: "",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProduct = (data) => {
    axiosInstance
      .get(`articles/${data.id}`, {})
      .then((res) => {
        getProductData(res.data);
      })
      .then(handleClickOpen())
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  };

  useEffect(() => {
    if (externalId.length > 0 && botiga.length > 0) {
      const extIdInt = parseInt(externalId) || 0;
      const product2Display = botiga.filter(x => x.id === extIdInt);
      product2Display.length > 0 && fetchProduct(product2Display[0]);
    }
  }, [botiga]);

  const cardGenerator =
    botiga.length > 0
      ? botiga.map((data) => {
          return (
            <div
              className="fullcardBotiga"
              key={data.id}
              onClick={() => fetchProduct(data)}
            >
              <div className="productCard">
                <div className="productImgFrame">
                  <img
                    className="productImgTop"
                    src={isCORSInactive() + data.images[0]}
                    alt={data.name}
                  />
                </div>
                <div className="productCardBody">
                  <TitleStyled>
                    <ReactFitty maxSize={50}>{data.name}</ReactFitty>
                  </TitleStyled>
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
        createLastRowIterator(botiga, 467).map((n, index) => (
          <i aria-hidden={true} key={index}></i>
        ))}
      {open && (
        <ProducteDialog
          open={open}
          dataRow={productData}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
