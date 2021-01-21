import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ClearIcon from '@material-ui/icons/Clear';
import './Activitat.css';

export default function ActivitatDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <Card className="cardActivitatGeneral" >
                <div className="insideFrameModal">
                    <ClearIcon className="crossCloseActivitatModal" onClick={handleClose} />
                    <div className="titleActivitatModal" id="simple-dialog-title">
                        {dataRow.name}
                    </div>
                    <hr className="solid" />
                    <div className="cardLocation">
                        <span className="mainActivitatWordBoxCard">
                            <LocationOnIcon /> LOCALITZACIÓ / &nbsp;
                        </span>
                        <span className="addressLinkActivitatCard">
                            <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer">
                                {dataRow.address}
                            </a>
                        </span>
                    </div>
                    <CardMedia
                        component="img"
                        alt={dataRow.name}
                        className="imageActivitatModal"
                        image={dataRow.images}
                        title={dataRow.name}
                    />
                    <hr className="solid" />
                    <div className="dateActivitatDetailed row">
                        <div className="column">
                            <span className="mainActivitatWordBoxCard">
                                <CalendarTodayIcon /> DATA / &nbsp;
                            </span>
                            <span className="dateLinkActivitatCard">
                                <a href="https://google.com/calendar" target="_blank" rel="noopener noreferrer">
                                    {dataRow.datetime!==undefined?dataRow.datetime.split("T")[0]:""}-
                                    {dataRow.datetime!==undefined?dataRow.datetime.substring(dataRow.datetime.lastIndexOf("T") + 1,dataRow.datetime.lastIndexOf("Z")).slice(0, -3):""}
                                </a>
                            </span>
                            <br />
                            <span className="mainActivitatWordBoxCard"><LocalAtmIcon /> PREU / </span>
                            <span className="priceBoxActivitatCard">{dataRow.price}</span>
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" className="buttonTicketActivitatBoxCard" color="inherit">
                                    <ReceiptIcon className="buttonTicketIconActivitatBoxCard" /><span className="buttonTicketTextActivitatBoxCard">RESERVA ENTRADA</span>
                                </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionActivitatCardBox">
                        <span className="mainActivitatWordBoxCard">
                            DESCRIPCIÓ / &nbsp;
                        </span>
                        <p className="textActivitatModal" >
                            {dataRow.description}
                        </p>
                    </div>
                    <hr className="dashed" />
                    <div className="artistBox">
                        <span className="mainActivitatWordBoxCard">
                            ARTIST / LINE-UP &nbsp;
                        </span>
                        <p className="textActivitatModal" >
                            {dataRow.artists}
                        </p>
                    </div>
                    <hr className="solid" />
                </div>
            </Card>
        </Dialog>
    );
}