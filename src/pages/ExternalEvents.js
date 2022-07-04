import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import LettersMove from '../components/layout/LettersMove';
import ExternalEvent from '../components/externalEvents/ExternalEvent';
import axiosInstance from '../axios';
import { API_URL, productQueryKind } from '../utils/constants';
import { addToCart } from '../redux/actions/cart';
import { useLocation } from 'react-router-dom';

const SyledExternalBox = styled.div`
    height: 100%;
    background-color: #FAE6C5;
`

const SyledExternalError = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue";
    font-size: 30px;
`

const ExternalEvents = () => {
    const [t] = useTranslation("translation");
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({})
    const [producteLoading, setProducteLoading] = useState(false)
    let location = useLocation();
    const queryString = require("query-string");
    const value = queryString.parse(location.search);
    const { id = '', kind = '' } = value;
    const { variants } = productData || {};
    const url_kinds = productQueryKind.hasOwnProperty(kind) ? productQueryKind[kind] : "events";
    const noProductData = Object.keys(productData).length === 0;
    // http://localhost/product?id=14&kind=SOCI
    // http://localhost/product?id=12&kind=ACTIVITAT
    // http://localhost/product?id=1&kind=PRODUCTE

    useEffect(() => {
        const url = `${API_URL}${url_kinds}/${id}/`;
        setProducteLoading(true);
        axiosInstance
            .get(url, {})
            .then((res) => {
                setProductData(res.data);
                setProducteLoading(false);
            })
            .catch(err => {
                setProducteLoading(false);
                if (err.response) {
                    console.log("ERROR: client received an error response (5xx, 4xx)", err.response);
                } else if (err.request) {
                    console.log("ERROR: client never received a response, or request never left", err.response);
                } else {
                    console.log("ERROR: anything else", err);
                }
            })
    }, [id, kind])

    const handleAddClick = () => {
        dispatch(addToCart(variants[0].id));
    }

    return (
        <div>
            <SyledExternalBox>
                {producteLoading ? <SyledExternalError><span className="spinner-border" /> </SyledExternalError> : noProductData ? <SyledExternalError><br />{t("errors.linkBuit1")}<br /><br />{t("errors.linkBuit2")}<br /><br /></SyledExternalError> : <ExternalEvent productData={productData} handleAddClick={handleAddClick} kind={kind} />}
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

export default ExternalEvents;