import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addMemberToCart, deleteFullCart } from '../../redux/actions/cart';
import {setMemberCandidate} from '../../redux/actions/state';
import { Redirect } from 'react-router-dom';
import axiosInstance from "../../axios";
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ClearIcon from '@material-ui/icons/Clear';
import './Soci.css'

export default function SociDialog(props) {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch();
    const [socisData, getSocisData] = useState();
    const [isSubscriber, setIsSubscriber] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axiosInstance.get(`subscriptions/`, {})
            .then((res) => {
                console.log("subscriptions",res.data);
                getSocisData(res.data)
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleAddClick = () => {
        // dispatch(deleteFullCart()).then(()=> {
            console.log("Socis data", socisData[isSubscriber].variants[0])
            dispatch(addMemberToCart(socisData[isSubscriber].variants[0]))
            dispatch(setMemberCandidate())
            setRedirect(true)
        // })
        // handleClose();
    }

    if (redirect) {
        return <Redirect to='/membership-registration' />;
    }

    return (
        <Dialog onClose={handleClose}
            // aria-labelledby="simple-dialog-title" 
            open={open} >
            {socisData ? <Card className="cardSociGeneral" >
                <div className="insideFrameModal">
                    <ClearIcon className="crossSociCloseModal" onClick={handleClose} />
                    <br />
                    <div className="row topSociBlock">
                        <div className="column_productTitle1">
                            <div className="titleSociModal" id="simple-dialog-title">
                                FES-TE SOCI/A!
                            </div>
                        </div>
                        <div className="column_productTitle2">
                            <div className="cardSociPriceBigBox">
                                {socisData[isSubscriber].price_range}
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <CardMedia
                        component="img"
                        alt=""
                        className="imageSociModal"
                        image={socisData[isSubscriber].images[0]}
                        title=""
                    />
                    <hr className="solid" />
                    <div className="dateSociDetailed row">
                        <div className="column ">
                            <span className="mainSociWordBoxCard">
                                <PeopleAltIcon /> TIPUS DE SOCI/A / &nbsp;
                            </span>
                            <div className="sociTypeBox">
                                <div className={isSubscriber === 1 ? "subscriberSociBox" : "professionalSociBox"} onClick={() => setIsSubscriber(0)}>Subscriptor</div>
                                <div className={isSubscriber === 1 ? "professionalSociBox" : "subscriberSociBox"} onClick={() => setIsSubscriber(1)}>Professional</div>
                            </div>
                            <br />
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" className="buttonSociBoxCard" color="inherit" onClick={() => { handleAddClick(socisData[isSubscriber].id) }} >
                                    <ShoppingCartIcon className="buttonSociIconBoxCard" /><span className="buttonSociTextBoxCard">AFEGIR CISTELLA</span>
                                </button>
                            </CardActions>
                        </div>
                    </div>
                    <hr className="dashed" />
                    <div className="descriptionSociCardBox">
                        <span className="mainSociWordBoxCard">
                            DESCRIPCIÓ / &nbsp;
                            </span>
                        <p className="textSociModal" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis. Mauris hendrerit risus ante, sed consectetur tellus vestibulum ut. Fusce ut aliquet erat. Donec in lacus maximus, ullamcorper enim vitae, euismod arcu. Curabitur ut lacinia libero. Nulla fermentum auctor lorem quis egestas. Suspendisse placerat neque at magna aliquam, et efficitur ante lacinia. Curabitur sed tortor nibh. Quisque lacinia ac sem non iaculis. Fusce ac ante ultrices, consequat nulla et, faucibus nibh.
                        </p>
                    </div>
                    <hr className="dashed" />
                    <div className="artistBox">
                        <span className="mainSociWordBoxCard">
                            BENEFICIS &nbsp;
                            </span>
                        <p className="textSociModal" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis.
                        </p>
                    </div>
                    <hr className="solid" />
                </div>
            </Card> : null}
        </Dialog>
    );
}