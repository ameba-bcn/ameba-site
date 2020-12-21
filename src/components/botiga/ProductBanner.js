import React from 'react';
import './ProductBanner.css'

const ProductBanner = (props) => {
    return (
        <div className="productBanner">
            <div className="productBannerTitle">
               {props.title}
            </div>
            <div className="productBannerPlus">+</div>
        </div>
    )
}

export default ProductBanner;