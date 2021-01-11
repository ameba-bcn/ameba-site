import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import './Activitat.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ClearIcon from '@material-ui/icons/Clear';

export default function ActivitatDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <Card className="cardGeneral" >
                <div className="insideFrameModal">
                <ClearIcon className="crossCloseModal" onClick={handleClose}/>
                    <div className="titleModal" id="simple-dialog-title">
                        {dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                    </div>
                    <hr className="solid" />
                    <div className="cardLocalization">
                        <span className="mainWordBoxCard">
                            <LocationOnIcon /> LOCALITZACIÓ / &nbsp;
                        </span>
                        <span className="addressLinkCard">
                            <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer">
                                {dataRow.selectedRow ? dataRow.selectedRow.address : ''}
                            </a>
                        </span>
                    </div>
                    <CardMedia
                        component="img"
                        alt={dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                        className="imageModal"
                        image={dataRow.selectedRow ? dataRow.selectedRow.img : ''}
                        title={dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                    />
                    <hr className="solid" />
                    <div className="dateDetailed row">
                        <div className="column">
                            <span className="mainWordBoxCard">
                                <CalendarTodayIcon /> DATA / &nbsp;
                            </span>
                            <span className="dateLinkCard">
                                <a href="https://google.com/calendar" target="_blank" rel="noopener noreferrer">
                                    {dataRow.selectedRow ? dataRow.selectedRow.date : ''}-
                                    {dataRow.selectedRow ? dataRow.selectedRow.hour : ''}
                                </a>
                            </span>
                            <br />
                            <span className="mainWordBoxCard"><LocalAtmIcon /> PREU / </span>
                            <span className="priceBoxCard">{dataRow.selectedRow ? dataRow.selectedRow.price : ''}</span>
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" className="buttonTicketBoxCard" color="inherit">
                                    <ReceiptIcon className="buttonIconBoxCard"/><span className="buttonTextBoxCard">RESERVA ENTRADA</span>
                                </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionCardBox">  
                        <span className="mainWordBoxCard">
                            DESCRIPCIÓ / &nbsp;
                            </span>
                        <p className="textModal" >
                            {dataRow.selectedRow ? dataRow.selectedRow.article : ''}
                        </p>
                    </div>
                    <hr className="dashed" />
                    <div className="artistBox">
                        <span className="mainWordBoxCard">
                            ARTIST / LINE-UP &nbsp;
                            </span>
                    </div>
                    <hr className="solid" />
                </div>
            </Card>
        </Dialog>
    );
}