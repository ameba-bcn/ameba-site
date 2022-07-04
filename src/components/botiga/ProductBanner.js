import { useMediaQuery } from "@material-ui/core";
import React from "react";
import { MOBILE_NORMAL } from "../../utils/constants";
import PlusButton from "../button/PlusButton";
import "./ProductBanner.css";

const ProductBanner = (props) => {
  const isMobile = useMediaQuery(MOBILE_NORMAL)
  return (
    <div className="productBanner">
      <div className="productBannerTitle">{props.title}</div>
      <PlusButton plusStyle="plus--red" plusSize={isMobile ? "plus--small" : "plus--big"} />
    </div>
  );
};

export default ProductBanner;
