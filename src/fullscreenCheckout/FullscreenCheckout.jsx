import React, { useState } from "react";
import "./FullscreenCheckout.css";
import CloseModal from "../modals/CloseModal";
import { useTranslation } from "react-i18next";
import useUIStore from "../stores/useUIStore";
import useCartStore from "../stores/useCartStore";

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
    <div className="fullscreen-checkout__macro-view">
      <div className="fullscreen-checkout__view">
        <div className="fullscreen-checkout__nav">
          <div onClick={() => handleOpen()}>{t("modal.sortir")}</div>
        </div>
        <CloseModal
          open={open}
          handleClose={handleCloseModal}
          handleExitFullscreen={handleExitFullscreen}
          copyText={t("modal.sortir-text")}
        />
      </div>
    </div>
  );
};

export default FullscreenCheckout;
