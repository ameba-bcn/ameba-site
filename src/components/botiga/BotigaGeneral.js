import React, { useState } from 'react';
import './BotigaGeneral.css';
import ProducteDialog from './Producte';
import axiosInstance from "../../axios";
import { formatPrice } from './../../utils/utils';
import { useSelector } from "react-redux";

export default function BotigaGeneral() {

    const [open, setOpen] = React.useState(false);
    const data = useSelector(state => state.data)
    const { botiga = [] } = data

    const [productData, getProductData] = useState([
        {
            id: 0,
            name: "",
            description: "",
            price: "",
            stock: 0,
            variants: [""],
            images: [""],
            is_active: false,
            discount: ""
        }
    ]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const fetchProduct = (data) => {
        axiosInstance.get(`articles/${data.id}`, {})
            .then((res) => {
                getProductData(res.data)
            }).then(handleClickOpen())
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }

    const cardGenerator = botiga.length > 0 ? botiga.map((data) => {
        return (
            <div className="fullcardBotiga" key={data.id}
                onClick={() => fetchProduct(data)}>
                <div className="productCard">
                    <div className="productImgFrame">
                        <img className="productImgTop" src={data.images[0]} alt={data.name} />
                    </div>
                    <div className="productCardBody">
                        <h5 className="productTitle" >{data.name}</h5>
                        <p className="productCardPrice">{formatPrice(data.price_range)}</p>
                    </div>
                </div>
            </div>
        )
    }) : null

    return (
        <div className="productCardDeck">
            {cardGenerator}
            <ProducteDialog open={open}
                dataRow={productData}
                onClose={handleClose} />
        </div>
    )

};