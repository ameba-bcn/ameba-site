import React from 'react';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import './Activitat.css'

export default function SimpleDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            
            <Card className="cardGeneral" >
            <div className="titleModal" id="simple-dialog-title">
                {dataRow.selectedRow ? dataRow.selectedRow.title : ''}
            </div>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                        className="imageModal"
                        image={dataRow.selectedRow ? dataRow.selectedRow.img : ''}
                        title={dataRow.selectedRow ? dataRow.selectedRow.title : ''}
                    />
                    <CardContent className="modalTextBox">
                        <div gutterBottom className="textModal addressModal" variant="h5" component="h2">
                            {dataRow.selectedRow ? dataRow.selectedRow.address : ''}
                            <br/> 
                            {dataRow.selectedRow ? dataRow.selectedRow.hour : ''}
                            -
                            {dataRow.selectedRow ? dataRow.selectedRow.date : ''}
                            <br/>
                            PREU: {dataRow.selectedRow ? dataRow.selectedRow.price : ''}
                        </div>
                        <div variant="body2" className="textModal" color="textSecondary" component="p">
                            {dataRow.selectedRow ? dataRow.selectedRow.article : ''}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <button size="small" color="inherit">
                        Reserva
                    </button>
                </CardActions>
            </Card>
        </Dialog>
    );
}