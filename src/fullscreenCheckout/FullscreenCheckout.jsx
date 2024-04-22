import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseModal from "../modals/CloseModal";
import { closeFullscreen } from "../store/actions/fullscreen";
import { useTranslation } from "react-i18next";
import { getCart } from "../store/actions/cart";

const StyledMacroFullscreenView = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledFullscreenView = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
`;

const StyledFullscreenNav = styled.div`
  overflow: hidden;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  height: 90px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  div {
    font-size: 40px;
    font-family: "Bebas Neue";
    color: #fae6c5;
    cursor: pointer;
    margin-right: 12px;
  }
`;
const FullscreenCheckout = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [t] = useTranslation("translation");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleExitFullscreen = () => {
    setOpen(false);
    dispatch(closeFullscreen());
    dispatch(getCart());
  };

  return (
    <StyledMacroFullscreenView>
      <StyledFullscreenView>
        <StyledFullscreenNav>
          <div onClick={() => handleOpen()}>{t("modal.sortir")}</div>
        </StyledFullscreenNav>
        <CloseModal
          open={open}
          handleClose={handleCloseModal}
          handleExitFullscreen={handleExitFullscreen}
        />
      </StyledFullscreenView>
    </StyledMacroFullscreenView>
  );
};

export default FullscreenCheckout;
