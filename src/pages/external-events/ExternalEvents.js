import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LettersMove from "../../components/layout/LettersMove";
import ExternalEvent from "../../components/externalEvents/ExternalEvent";
import axiosInstance from "../../axios";
import { API_URL, productQueryKind } from "../../utils/constants";
import { addToCart } from "../../store/actions/cart";
import { useLocation } from "react-router-dom";

const SyledExternalBox = styled.div`
  height: 100%;
  background-color: #fae6c5;
`;

const SyledExternalError = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "Bebas Neue";
  font-size: 30px;
`;

const ExternalEvents = () => {
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({});
  const [producteLoading, setProducteLoading] = useState(false);
  const location = useLocation();
  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const value = queryString.parse(location.search.replace("?", ""));
  const { id = "", kind = "" } = value;
  const { variants } = productData || {};
  // eslint-disable-next-line no-prototype-builtins
  const url_kinds = productQueryKind?.hasOwnProperty(kind)
    ? productQueryKind[kind]
    : "events";
  const noProductData = Object.keys(productData).length === 0;

  useEffect(() => {
    const url = `${API_URL}${url_kinds}/${id}/`;
    setProducteLoading(true);
    axiosInstance
      .get(url, {})
      .then((res) => {
        setProductData(res.data);
        setProducteLoading(false);
      })
      .catch((err) => {
        setProducteLoading(false);
        console.warn("ERROR: ", err);
      });
  }, [id, kind]);

  const handleAddClick = () => {
    dispatch(addToCart(variants[0].id));
  };

  return (
    <div>
      <SyledExternalBox>
        {producteLoading ? (
          <SyledExternalError>
            <span className="spinner-border" />{" "}
          </SyledExternalError>
        ) : noProductData ? (
          <SyledExternalError>
            <br />
            {t("errors.linkBuit1")}
            <br />
            <br />
            {t("errors.linkBuit2")}
            <br />
            <br />
          </SyledExternalError>
        ) : (
          <ExternalEvent
            productData={productData}
            handleAddClick={handleAddClick}
            kind={kind}
          />
        )}
      </SyledExternalBox>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
};

export default React.memo(ExternalEvents);
