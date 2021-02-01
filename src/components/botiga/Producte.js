import React from 'react';
import { useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import { addToCart } from '../../redux/actions/cart';

import './Producte.css';

export default function ProducteDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const dispatch = useDispatch();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleAddClick = () => {
        dispatch(addToCart(dataRow.id))
            .then(() => {
                console.log("Añadido desde el componente", dataRow.id);
            })
            .catch(() => {
                console.log("Fallado desde el componente", dataRow.id);
            });
    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <Card className="cardProducteGeneral">
                <div className="insideFrameModal">
                    <ClearIcon className="crossCloseProducteModal" onClick={handleClose} />
                    <br />
                    <div className="row topProductBlock">
                        <div className="column_productTitle1">
                            <div className="productTitleModal" id="simple-dialog-title">
                                {dataRow.name}
                            </div>
                        </div>
                        <div className="column_productTitle2">
                            <div className="cardPriceProducteBigBox">
                                {dataRow.price}€
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="productImageBox">
                        <div className="columnProductImage1">
                            <CardMedia
                                component="img"
                                alt={dataRow.name}
                                className="imageProductModal"
                                image={dataRow.images}
                                title={dataRow.name}
                            />
                        </div>
                        <div className="columnProductImage2">
                            <div className="row1ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow.name}
                                    className="imageRow1ProductModal"
                                    image={dataRow.images}
                                    title={dataRow.name}
                                />
                            </div>
                            <div className="row2ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow.name}
                                    className="imageRow2ProductModal"
                                    image={dataRow.images}
                                    title={dataRow.name}
                                />
                            </div>
                            <div className="row3ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow.name}
                                    className="imageRow3ProductModal"
                                    image={dataRow.images}
                                    title={dataRow.name}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="sizeProductDetailed row">
                        <div className="column">
                            <span className="mainProducteWordBoxCard">
                                <PeopleAltIcon /> TALLES DISPONIBLES / &nbsp;
                            </span>
                            <div className="sizesBox">
                                {["S", "M", "L", "XL"].map((el) => (
                                    <div className="sizeProductBox" key={el}>
                                        {el}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" className="buttonCartProductBoxCard" color="inherit" onClick={() => { handleAddClick(dataRow.id) }}>
                                    <ShoppingCartIcon className="buttonCartProductIconBoxCard" /><span className="buttonTextProductBoxCard">AFEGIR A CISTELLA</span>
                                </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionProductCardBox">
                        <span className="mainProducteWordBoxCard">
                            DESCRIPCIÓ &nbsp;
                            </span>
                        <p className="textProductModal">
                            {dataRow.description}
                        </p>
                    </div>
                    <hr className="solid" />
                </div>
            </Card>
        </Dialog>
    );
}