import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import { addToCart } from '../../redux/actions/cart';
import ImageCarousel from './ImageCarousel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { formatPrice } from './../../utils/utils';
import './Producte.css';

export default function ProducteDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:640px)');
    const [sizes, setSizes] = useState([])


    const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : [])

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleAddClick = () => {
        dispatch(addToCart(dataRow.id))
        handleClose();
    }

    useEffect(() => {
        let arr = []
        if (dataRow.variants) {
            dataRow.variants.forEach(element => {
                if (element.stock > 0) {
                    arr.push(element.attributes[0].value.toUpperCase())
                    console.log("el", element.attributes[0])
                }
            })
        }
        setSizes(arr)
    }, [dataRow]);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            {!isMobile && (<>
                <Card className="card-general-mobile">
                    <ClearIcon className="close-modal" onClick={handleClose} />
                    <div className="frame-margin-modal">
                        <div className="row top-title-price-modal">
                            <div className="top-title-price-modal-col1">
                                <div className="title-modal">
                                    {dataRow.name}
                                </div>
                            </div>
                            <div className="top-title-price-modal-col2">
                                <div className="title-modal-price">
                                    {formatPrice(dataRow.price_range)}
                                </div>
                            </div>
                        </div>
                        <hr className="modal-solid" />
                        <div className="img-modal">
                            <ImageCarousel imgList={dataRow.images} />
                        </div>
                        <hr className="modal-solid" />
                        <div className="size-description-modal-box">
                            <div>
                                <div className="column">
                                    <div className="sizes-modal-title">
                                        <PeopleAltIcon /> TALLES DISPONIBLES / &nbsp;
                                    </div>
                                    {sizes && sizes[0] === "UNIQUE" ?
                                        <div>Talla única</div> : <>
                                            {sizes.map((el) => (
                                                <div className={activeSize === el ? "sizes-modal-button-active" : "sizes-modal-button"} key={el} onClick={() => setActiveSize(el)}>
                                                    {el}
                                                </div>
                                            ))}</>}
                                </div>
                                <div className="column">
                                    <CardActions>
                                        <button size="small" className="buttonCartProductBoxCard" color="inherit" onClick={() => { handleAddClick(dataRow.id) }}>
                                            <ShoppingCartIcon className="buttonCartProductIconBoxCard" /><span className="buttonTextProductBoxCard">AFEGIR A CISTELLA</span>
                                        </button>
                                    </CardActions>
                                </div>
                            </div>
                        </div>
                        <hr className="modal-dashed" />
                        <div className="description-modal-title">
                            DESCRIPCIÓ &nbsp;
                            </div>
                        <div className="description-modal-content">
                            {dataRow.description}
                        </div>
                        <hr className="modal-solid" />
                    </div>
                </Card>
            </>)}
            {isMobile && (
                <Card className="card-general-mobile">
                    <ClearIcon className="close-modal" onClick={handleClose} />
                    <div className="frame-margin-modal-mobile">
                        <hr className="thin" />
                        <div className="title-modal">
                            {dataRow.name}
                        </div>
                        <hr className="thin" />
                        <div className="img-modal">
                            <ImageCarousel imgList={dataRow.images} />
                        </div>
                        <hr className="thin" />
                        <div className="description-modal">
                            <span className="description-modal-title-mobile">
                                DESCRIPCIÓ
                            </span>
                            <p className="description-modal-content">
                                {dataRow.description}
                            </p>
                        </div>
                        <hr className="thin" />
                        <div className="sizes-modal">
                            <span className="sizes-modal-title-mobile">
                                <PeopleAltIcon /> TALLES DISPONIBLES / &nbsp;
                            </span>
                            {["S", "M", "L", "XL"].map((el) => (
                                <div className={activeSize === el ? "sizes-modal-button-active" : "sizes-modal-button"} key={el} onClick={() => setActiveSize(el)}>
                                    {el}
                                </div>
                            ))}
                        </div>
                        <button size="small" className="submit-button-modal-button" color="inherit" onClick={() => { handleAddClick(dataRow.id) }}>
                            <ShoppingCartIcon className="submit-button-modal-icon-cart" /><span className="submit-button-modal-button-text">AFEGIR A CISTELLA - {formatPrice(dataRow.price_range)}</span>
                        </button>
                    </div>
                </Card>
            )}
        </Dialog>
    );
}