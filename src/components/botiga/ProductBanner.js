import React from "react";
import PlusButton from "../button/PlusButton";
import "./ProductBanner.css";

const ProductBanner = (props) => {
  return (
    <div className="productBanner">
      <div className="productBannerTitle">{props.title}</div>
      <div className="productBannerPlus">
        <PlusButton plusStyle="plus--red" plusSize="plus--big" />
      </div>
    </div>
  );
};

export default ProductBanner;
