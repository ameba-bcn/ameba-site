import React, { useState, useEffect } from "react";
import "./BotigaGeneral.css";
import ProducteDialog from "./Producte";
import axiosInstance from "../../axios";
import { createLastRowIterator, formatPrice } from "./../../utils/utils";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactFitty } from "react-fitty";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { API_URL } from "../../utils/constants";

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
  const [open, setOpen] = useState(false);
  const [producteLoading, setProducteLoading] = useState(false);
  let location = useLocation();
  // eslint-disable-next-line no-undef
  const queryString = require("query-string");
  const value = queryString.parse(location.search);
  const externalId = value.id;
  const data = useSelector((state) => state.data);
  const { botiga = [] } = data;
  const [productData, setProductData] = useState([
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

  const isOneColumn = useMediaQuery("(max-width:1178px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProduct = (data) => {
    setProducteLoading(true);
    axiosInstance
      .get(`${API_URL}articles/${data.id}`, {})
      .then((res) => {
        setProductData(res.data);
        setProducteLoading(false);
      })
      .then(handleClickOpen())
      .catch((err) => {
        setProducteLoading(false);
        if (err.response) {
          console.log(
            "ERROR: client received an error response (5xx, 4xx)",
            err.response
          );
        } else if (err.request) {
          console.log(
            "ERROR: client never received a response, or request never left",
            err.response
          );
        } else {
          console.log("ERROR: anything else", err);
        }
      });
  };

  useEffect(() => {
    if (externalId?.length > 0 && botiga?.length > 0) {
      const extIdInt = parseInt(externalId) || 0;
      const product2Display = botiga.filter((x) => x.id === extIdInt);
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
                    src={data.images[0]}
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
        !isOneColumn &&
        createLastRowIterator(botiga, 518).map((n, index) => (
          <i aria-hidden={true} key={index}></i>
        ))}
      {open && (
        <ProducteDialog
          open={open}
          dataRow={productData}
          setProductData={setProductData}
          onClose={handleClose}
          loading={producteLoading}
        />
      )}
    </div>
  );
}
