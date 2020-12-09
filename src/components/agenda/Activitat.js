import React from 'react';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import './Activitat.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
export default function SimpleDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >

            <Card className="cardGeneral" >
                <div className="insideFrameModal">
                    <div className="titleModal" id="simple-dialog-title">
                        {dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                    </div>
                    <hr className="solid" />
                    <div className="cardLocalization">
                        <span className="mainWordBoxCard">
                            <LocationOnIcon /> LOCALITZACIÓ / &nbsp;
                        </span>
                        <span className="addressLinkCard">
                            <a href="https://google.com/maps" target="_blank">
                                {dataRow.selectedRow ? dataRow.selectedRow.address : ''}
                            </a>
                        </span>
                    </div>

                    {/* <CardActionArea> */}
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
                                <a href="https://google.com/calendar" target="_blank">
                                    {dataRow.selectedRow ? dataRow.selectedRow.date : ''}-
                                    {dataRow.selectedRow ? dataRow.selectedRow.hour : ''}
                                </a>
                            </span>
                            <br />
                            <span className="mainWordBoxCard"><LocalAtmIcon /> PREU / </span>
                            {dataRow.selectedRow ? dataRow.selectedRow.price : ''}
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" color="inherit">
                                    <ReceiptIcon />RESERVA ENTRADA
                    </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionCardBox">
                        {/* <CardContent className="modalTextBox"> */}
                        {/* <div className="textModal addressModal" variant="h5" component="h2"></div> */}

                        <span className="mainWordBoxCard">
                            DESCRIPCIÓ / &nbsp;
                            </span>
                        {/* <div variant="body2" className="textModal" color="textSecondary" component="p"> */}
                        <p className="textModal" >
                            {dataRow.selectedRow ? dataRow.selectedRow.article : ''}
                        </p>
                        {/* </div> */}
                    </div>
                    {/* </CardContent> */}
                    {/* </CardActionArea> */}
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