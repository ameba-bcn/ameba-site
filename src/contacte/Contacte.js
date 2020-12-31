import React from 'react';
// import Container from '@material-ui/core/Container';
import NewsletterForm from './NewsletterForm';
import './Contacte.css';
import LettersMove from '../components/layout/LettersMove';


import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
//Falta Mixcloud & Twitch


function Contacte() {
    return (
        <div className="bloqueContacto" id="contacte">
             <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                />
            <div className="contenedorContacto">
                <div className="newletterForm"><NewsletterForm /></div>
                <div className="iconsFooter">
                    <a href="https://www.facebook.com/amebabarcelona" rel="noopener noreferrer" target="_blank">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.instagram.com/ameba_bcn" rel="noopener noreferrer" target="_blank">
                        <InstagramIcon />
                    </a>                
                    <a href="https://twitter.com/ameba_bcn" rel="noopener noreferrer" target="_blank">
                        <TwitterIcon />
                    </a>
                    <a href="https://www.youtube.com/channel/UCH5ssfBCmgJ1IDM-pSn2cEg" rel="noopener noreferrer" target="_blank">
                        <YouTubeIcon />
                    </a>
                </div>
                <div className="endingText">©2020 AMEBA<br />Associació de Música Electrònica de Barcelona - Tots els drets reservats</div>
            </div>
        </div>
    );
}

export default Contacte;