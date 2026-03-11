import React, { useState, useEffect } from "react";
import "./BotigaGeneral.css";
import ProducteDialog from "./Producte";
import axiosInstance from "../../axios";
import { createLastRowIterator, formatPrice } from "./../../utils/utils";
import { ReactFitty } from "react-fitty";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import useMediaQuery from "../../hooks/use-media-query";
import useDataStore from "../../stores/useDataStore";

export default function BotigaGeneral() {
  const [open, setOpen] = useState(false);
  const [producteLoading, setProducteLoading] = useState(false);
  let location = useLocation();
  const value = Object.fromEntries(new URLSearchParams(location.search));
  const externalId = value.id;
  const { botiga = [] } = useDataStore();
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

        console.warn("ERROR: ", err);
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
                  <div className="botiga-general__title">
                    <ReactFitty maxSize={50}>{data.name}</ReactFitty>
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
