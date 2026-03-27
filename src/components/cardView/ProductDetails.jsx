import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";

const ProductDetails = ({
  sizes = [],
  activeSize = [],
  setActiveSize,
  selectSizeError = false,
  setSelectSizeError,
  productSoldOut = false,
}) => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    if (sizes?.length > 0) {
      setActiveSize(sizes.length === 1 ? sizes[0] : []);
    }
  }, [sizes]);

  return (
    <div className="modal-sizes-row">
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
