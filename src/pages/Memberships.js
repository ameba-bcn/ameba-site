import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import LettersMove from '../components/layout/LettersMove';
import { MEMBER_ID, MEMBER_LIST, MOBILE_NORMAL, PRO_MEMBER_LIST } from '../utils/constants';
import { addToCart } from '../redux/actions/cart';
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { StyledExternalButtonBox, StyledExternalEventBox, StyledExternalEventCol1, StyledExternalEventCol2, StyledTitleBox } from '../components/externalEvents/StyledExternalEvent';
import { ReactFitty } from 'react-fitty';
import ImageCarousel from '../components/images/ImageCarousel';
import Button from '../components/button/Button';
import InteractiveModalBox from '../modals/InteractiveModalBox';
import { useMediaQuery } from '@material-ui/core';
import { toast } from 'react-toastify';
import Toast from '../components/toast/Toast';
import { isMemberCheckout } from '../utils/utils';

const SyledExternalBox = styled.div`
    height: 100%;
    background-color: #FAE6C5;
`

const SyledDisclaimer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue";
    font-size: 30px;
    border-style: solid;
    border-color: #eb5e3e;
    margin-top: 20px;
`

const Memberships = () => {
    const [t] = useTranslation("translation");
    const dispatch = useDispatch();
    const { membership = [] } = useSelector((state) => state.data);
    const [membershipSoci] = membership.filter(el => el.id === MEMBER_ID)
    const [membershipPro] = membership.filter(el => el.id !== MEMBER_ID)
    const [productData, setProductData] = useState(membershipSoci)
    const isMobile = useMediaQuery(MOBILE_NORMAL);
    const { cart_data = {} } = useSelector((state) => state.cart);
    const { item_variants = [] } = cart_data;
    const hasMembershipInCart = isMemberCheckout(item_variants);

    const {
        price_range = '',
        images = [],
        datetime = '',
        description = '',
        variants = [],
        benefits = '',
        has_stock = true,
        id = MEMBER_ID
    } = productData || {};

    const [isSubscriber, setIsSubscriber] = useState(id === MEMBER_ID);
    const colorMode = ''
    const [activeSize, setActiveSize] = useState([]);
    const [selectSizeError, setSelectSizeError] = useState(false);
    const modalStyle = "SOCI"
    const productSoldOut = !has_stock;
    const buttonText = t("modal.afegir");
    const box1Title = t("modal.descripcio")
    const box2Title = t("modal.beneficis")


    useEffect(() => {
        setProductData(isSubscriber ? membershipSoci : membershipPro)
    }, [membership, isSubscriber, setIsSubscriber])

    const handleAddClick = () => {
        dispatch(addToCart(variants[0]));
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
    const socisButtonName = membership.filter((x) =>
        MEMBER_LIST.includes(x.name)
    )[0]?.name;
    const proButtonName = membership.filter((x) =>
        PRO_MEMBER_LIST.includes(x.name)
    )[0]?.name;
    const buttons = [socisButtonName, proButtonName];

    return (
        <div>
            <SyledExternalBox>
                {membership.length > 0 &&
                    <StyledExternalEventBox>
                        <StyledTitleBox>
                            <ReactFitty maxSize={75}>
                                {`${t("banners.soci-curt")}!`}
                            </ReactFitty>
                        </StyledTitleBox>
                        <div className="rowExternal">
                            <StyledExternalEventCol1>
                                <ImageCarousel imgList={images} />
                                <StyledExternalButtonBox>
                                    {/* // eslint-disable-line */}
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
                                        onClick={() => {
                                            !productSoldOut && handleAddClick(id);
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
                                    sizes={[]}
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

                                <div className="interactiveDataBox-activitat__row">
                                    <span className="modal-card___title_small">
                                        <LocalAtmIcon /> <span>{t("modal.preu")} / &nbsp;</span>
                                    </span>
                                    <span className="interactiveDataBox-activitat__text-data">
                                        {price_range}
                                    </span>
                                </div>
                                <div className="modal-card__description-title-external">{box1Title}</div>
                                <div className="modal-card__description-content">{description}</div>
                                {box2Title && (
                                    <>
                                        {benefits && <> <div className="modal-card__description-title-external">{box2Title}</div>
                                            <div className="modal-card__description-content">
                                                {benefits}
                                            </div></>}
                                    </>
                                )}
                                {hasMembershipInCart && <SyledDisclaimer>
                                    {t("soci.disclaimer")}
                                </SyledDisclaimer>}
                            </StyledExternalEventCol2>
                        </div>
                    </StyledExternalEventBox>}
            </SyledExternalBox>
            <LettersMove
                className="lettersMoveDiv"
                sentence={t("banners.soci-curt")}
                link="/memberships"
                color="#EB5E3E"
            />
        </div>);
};

export default Memberships;