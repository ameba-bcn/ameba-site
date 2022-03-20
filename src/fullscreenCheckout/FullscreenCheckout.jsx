import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseModal from '../modals/CloseModal';
import { closeFullscreen } from '../redux/actions/fullscreen';
import { useTranslation } from "react-i18next";


const StyledMacroFullscreenView = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const StyledFullscreenView = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
`

const StyledFullscreenNav = styled.div`
    overflow: hidden;
    background-color: #333;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    height: 90px;
    color: white;
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding: 30px;
    div{
        font-size: 30px;
        font-family: "Bebas Neue";
        color: #fae6c5;
        cursor: pointer;
    }
`
// https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
const FullscreenCheckout = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [t] = useTranslation("translation");

    const handleOpen = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleExitFullscreen = () => {
        setOpen(false);
        dispatch(closeFullscreen())
    }

    return (
        <StyledMacroFullscreenView>
            <StyledFullscreenView>
                <StyledFullscreenNav>
                    <div onClick={() => handleOpen()}>{t("modal.sortir")}</div>
                </StyledFullscreenNav>
                <CloseModal open={open} handleClose={handleCloseModal} handleExitFullscreen={handleExitFullscreen} />
            </StyledFullscreenView>
        </StyledMacroFullscreenView>
    );
};

export default FullscreenCheckout;