import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import { gsap, Flip, prefersReducedMotion, isTestEnv } from "../../utils/gsapSetup";
import "./CardView.css";

const ProductDetails = ({
  sizes = [],
  activeSize = [],
  setActiveSize,
  selectSizeError = false,
  setSelectSizeError,
  productSoldOut = false,
}) => {
  const [t] = useTranslation("translation");
  const rowRef = useRef(null);
  const highlightRef = useRef(null);
  const flipState = useRef(null);

  useEffect(() => {
    if (sizes?.length > 0) {
      setActiveSize(sizes.length === 1 ? sizes[0] : []);
    }
  }, [sizes]);

  // §4.4 "El requadre actiu es mou entre opcions amb Flip" — one
  // highlight box that travels to sit behind whichever size is active.
  const captureFlip = () => {
    if (prefersReducedMotion() || isTestEnv() || !highlightRef.current) return;
    flipState.current = Flip.getState(highlightRef.current);
  };

  useEffect(() => {
    const highlight = highlightRef.current;
    const row = rowRef.current;
    if (!highlight || !row) return;

    const activeBtn = row.querySelector(".sizes.interactiveDataBox-product-sizes__button_active");
    if (!activeBtn) {
      gsap.set(highlight, { autoAlpha: 0 });
      flipState.current = null;
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    gsap.set(highlight, {
      autoAlpha: 1,
      left: btnRect.left - rowRect.left,
      top: btnRect.top - rowRect.top,
      width: btnRect.width,
      height: btnRect.height,
    });

    if (flipState.current && !prefersReducedMotion() && !isTestEnv()) {
      Flip.from(flipState.current, { targets: highlight, duration: 0.3, ease: "power3.inOut" });
    }
    flipState.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSize]);

  return (
    <div className="modal-sizes-row" ref={rowRef}>
      <div className="modal-card___title_small">
        <Icon icon="people" />{" "}
        <span>
          {productSoldOut ? t("modal.esgotat") : t("modal.talles")} / &nbsp;
        </span>
      </div>
      {(sizes && sizes[0] === "UNIQUE") || sizes?.length === 1 ? (
        <div className="modal-center-label">Talla única</div>
      ) : (
        <>
          <span className="modal-sizes-row__highlight" ref={highlightRef} aria-hidden="true" />
          {sizes?.map((el) => {
            const talla = el.split(" ")[0];
            return (
              <div
                className={
                  activeSize === el
                    ? "sizes interactiveDataBox-product-sizes__button_active"
                    : "sizes interactiveDataBox-product-sizes__button"
                }
                key={el}
                onClick={() => {
                  captureFlip();
                  setActiveSize(el);
                  setSelectSizeError(false);
                }}
              >
                {talla}
              </div>
            );
          })}
          {selectSizeError && (
            <div className="error-message">{t("modal.sizesError")}</div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
