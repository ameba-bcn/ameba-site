import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import './Producte.css'
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ReceiptIcon from '@material-ui/icons/Receipt';
// import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// import HowToRegIcon from '@material-ui/icons/HowToReg';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';

export default function ProducteDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            {console.log("SSS", dataRow)}
            <Card className="cardGeneral" >
                <div className="insideFrameModal">
                    <ClearIcon className="crossCloseModal" onClick={handleClose} />
                    <br />
                    <div className="row">
                        <div className="column_productTitle1">
                            <div className="productTitleModal" id="simple-dialog-title">
                                {dataRow ? dataRow.title : ''}
                            </div>
                        </div>
                        <div className="column_productTitle2">
                            <div className="cardPriceBigBox">
                                XX €
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="productImageBox">
                        <div className="columnProductImage1">
                            <CardMedia
                                component="img"
                                alt={dataRow ? dataRow.title : ''}
                                className="imageProductModal"
                                image={dataRow ? dataRow.img : ''}
                                title={dataRow ? dataRow.title : ''}
                            />
                        </div>
                        <div className="columnProductImage2">
                            <div className="row1ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow ? dataRow.title : ''}
                                    className="imageRow1ProductModal"
                                    image={dataRow ? dataRow.img : ''}
                                    title={dataRow ? dataRow.title : ''}
                                />
                            </div>
                            <div className="row2ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow ? dataRow.title : ''}
                                    className="imageRow2ProductModal"
                                    image={dataRow ? dataRow.img : ''}
                                    title={dataRow ? dataRow.title : ''}
                                />
                            </div>
                            <div className="row3ProductImage">
                                <CardMedia
                                    component="img"
                                    alt={dataRow ? dataRow.title : ''}
                                    className="imageRow3ProductModal"
                                    image={dataRow ? dataRow.img : ''}
                                    title={dataRow ? dataRow.title : ''}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="sizeDetailed row">
                        <div className="column">
                            <span className="mainWordBoxCard">
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
                                <button size="small" className="buttonCartBoxCard" color="inherit">
                                    <ShoppingCartIcon className="buttonIconBoxCard" /><span className="buttonTextProductBoxCard">AFEGIR A CISTELLA</span>
                                </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionCardBox">
                        <span className="mainWordBoxCard">
                            DESCRIPCIÓ &nbsp;
                            </span>
                        <p className="textModal" >
                            {dataRow ? dataRow.article : ''}
                        </p>
                    </div>
                    <hr className="solid" />
                </div>
            </Card>
        </Dialog>
    );
}