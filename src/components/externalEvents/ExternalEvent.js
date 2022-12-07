import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useMediaQuery } from '@material-ui/core';
import { ReactFitty } from 'react-fitty';
import { toast } from "react-toastify";
import Toast from "../toast/Toast";
import InteractiveModalBox from '../../modals/InteractiveModalBox';
import ImageCarousel from '../images/ImageCarousel';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReceiptIcon from "@material-ui/icons/Receipt";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';
import { useHistory } from 'react-router-dom';
import { MEMBER_LIST, MOBILE_NORMAL, productKinds, PRO_MEMBER_LIST } from '../../utils/constants';
import { StyledExternalButtonBox, StyledExternalEventBox, StyledExternalEventCol1, StyledExternalEventCol2, StyledTitleBox } from './StyledExternalEvent';
import { urlify } from '../../utils/utils';

const ExternalEvent = ({ productData = {}, kind = '', handleAddClick }) => {
    const {
        price_range = '',
        images = [],
        name = '',
        datetime = '',
        address = '',
        description = '',
        variants = [],
        benefits = '',
        has_stock = true,
        id
    } = productData;

    useEffect(() => {
        let arr = [];
        if (variants) {
            variants.forEach((element) => {
                if (element.stock > 0 || element.stock === -1) {
                    arr.push(element.attributes[0].value.toUpperCase());
                }
            });
        }
        setSizes(arr);
    }, [variants]);

    const { membership = [] } = useSelector((state) => state.data);
    let history = useHistory();
    const [activeSize, setActiveSize] = useState([]);
    const [selectSizeError, setSelectSizeError] = useState(false);
    const [isSubscriber, setIsSubscriber] = useState(id === 14);
    const [sizes, setSizes] = useState([]);
    const [t] = useTranslation("translation");
    const isMobile = useMediaQuery(MOBILE_NORMAL);
    const kinds = productKinds;
    const modalStyle = kinds.includes(kind) ? kind.toUpperCase() : kinds[0].toUpperCase();
    const productSoldOut = modalStyle === "PRODUCTE" ? sizes.length === 0 : !has_stock;
    const buttonIcon = modalStyle === "ACTIVITAT" ? <ReceiptIcon /> : <ShoppingCartIcon />;
    const buttonText = modalStyle === "ACTIVITAT" ? "RESERVA ENTRADA" : t("modal.afegir");
    const colorMode = ''
    const box1Title = t("modal.descripcio")
    const box2Title = t("modal.beneficis")

    const socisButtonName = membership.filter((x) =>
        MEMBER_LIST.includes(x.name)
    )[0]?.name;
    const proButtonName = membership.filter((x) =>
        PRO_MEMBER_LIST.includes(x.name)
    )[0]?.name;

    useEffect(() => {
        if (modalStyle === "SOCI") {
            if (isSubscriber) {
                history.push('/product?id=14&kind=soci');
            } else {
                history.push('/product?id=15&kind=soci');
            }
        }
    }, [isSubscriber]);

    const buttons = modalStyle === "SOCI" ? [socisButtonName, proButtonName] : [];

    const handleAddToCard = (id) => {
        if (activeSize.length === 0 && modalStyle === "PRODUCTE")
            setSelectSizeError(true);
        else {
            setSelectSizeError(false);
            if (modalStyle === "PRODUCTE") {
                handleAddClick(activeSize);
            } else {
                handleAddClick(id);
            }
            toast(<Toast />, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                className: "toast-black-background",
            });
        }
    };
    return (
        <StyledExternalEventBox>
            <StyledTitleBox>
                <ReactFitty maxSize={75}>
                    {modalStyle === "SOCI" ? `${t("banners.soci-curt")}!` : name}
                </ReactFitty>
            </StyledTitleBox>
            <div className="rowExternal">
                <StyledExternalEventCol1>
                    <ImageCarousel imgList={images} />
                    <StyledExternalButtonBox>
                        <Button
                            variant="contained"
                            color="primary"
                            buttonSize="boton--medium"
                            disabled={productSoldOut}
                            buttonStyle={
                                colorMode && colorMode === "dark"
                                    ? "boton--back-orange--solid"
                                    : "boton--primary--solid"
                            }
                            icon={buttonIcon}
                            onClick={() => {
                                !productSoldOut && handleAddToCard(id);
                            }}>
                            {buttonText}
                        </Button>
                    </StyledExternalButtonBox>
                </StyledExternalEventCol1>
                <StyledExternalEventCol2>
                    <InteractiveModalBox
                        modalStyle={modalStyle}
                        isMobile={isMobile}
                        productSoldOut={productSoldOut}
                        sizes={sizes}
                        isSubscriber={isSubscriber}
                        setIsSubscriber={setIsSubscriber}
                        activeSize={activeSize}
                        setActiveSize={setActiveSize}
                        selectSizeError={selectSizeError}
                        setSelectSizeError={setSelectSizeError}
                        extraButtons={buttons}
                        datetime={datetime}
                        handleAddClick={handleAddClick}
                        price={price_range} />
                    {modalStyle === "ACTIVITAT" && (
                        <div className="modal-card-location__row">
                            <div className="modal-card___title_small">
                                <LocationOnIcon />{" "}
                                <div>{t("modal.localitzacio")} / &nbsp;</div>
                            </div>
                            <div className="interactiveDataBox-activitat__text-loca-fullview">
                                <a
                                    href="https://google.com/maps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {address}
                                </a>
                            </div>
                        </div>
                    )}
                    {modalStyle !== "ACTIVITAT" && <div className="interactiveDataBox-activitat__row">
                        <span className="modal-card___title_small">
                            <LocalAtmIcon /> <span>{t("modal.preu")} / &nbsp;</span>
                        </span>
                        <span className="interactiveDataBox-activitat__text-data">
                            {price_range}
                        </span>
                    </div>}
                    <div className="modal-card__description-title-external">{box1Title}</div>
                    <div className="modal-card__description-content">{urlify(description)}</div>
                    {box2Title && (
                        <>
                            {modalStyle === "SOCI" && <> <div className="modal-card__description-title-external">{box2Title}</div>
                                <div className="modal-card__description-content">
                                    {urlify(benefits)}
                                </div></>}
                        </>
                    )}
                </StyledExternalEventCol2>
            </div>
        </StyledExternalEventBox>
    );
};

export default ExternalEvent;