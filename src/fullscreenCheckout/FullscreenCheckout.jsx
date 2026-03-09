import React, { useState } from "react";
import styled from "styled-components";
import CloseModal from "../modals/CloseModal";
import { useTranslation } from "react-i18next";
import useUIStore from "../stores/useUIStore";
import useCartStore from "../stores/useCartStore";

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
  const closeFullscreen = useUIStore((state) => state.closeFullscreen);
  const getCart = useCartStore((state) => state.getCart);
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
    closeFullscreen();
    getCart();
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
          copyText={t("modal.sortir-text")}
        />
      </StyledFullscreenView>
    </StyledMacroFullscreenView>
  );
};

export default FullscreenCheckout;
