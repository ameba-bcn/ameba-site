import React, {useState, useEffect} from 'react';
// import Data from './response.json';
import './BotigaGeneral.css';
import ProducteDialog from './Producte';
import axiosInstance from "../../axios";

export default function BotigaGeneral() {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([
        {
            id: 0,
            name: "",
            price:"",
            images: [""],
            discount: ""
        }
    ]);

    const [productData, setProductData] = useState([
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
            console.log(res.data);
            setProductData(res.data)
        }).then(handleClickOpen())
        .catch(error => {
            console.log("ERROL", error.response)
        });
    }

    useEffect(() => {
        axiosInstance.get(`articles/`, {})
            .then((res) => {
                console.log(res.data);
                setData(res.data)
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    const cardGenerator = data.map((data) => {
        return (
            <div className="fullcardBotiga" key={data.id}
                onClick={() => fetchProduct(data)}>
                <div className="productCard">
                    <div className="productImgFrame">
                        <img className="productImgTop" src={data.images[0]} alt={data.name} />
                    </div>
                    <div className="productCardBody">
                        <h5 className="productTitle" >{data.name}</h5>
                        <p className="productCardPrice">{data.price}{data.discount===""?"":`-${data.discount}`}€</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="productCardDeck">
            {cardGenerator}
            <ProducteDialog open={open}
                dataRow={productData}
                onClose={handleClose} />
        </div>
    )

};