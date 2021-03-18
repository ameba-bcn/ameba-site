import React from 'react';
// import Container from '@material-ui/core/Container';
import NewsletterForm from './NewsletterForm';
import './Contacte.css';
import MediaLinks from '../components/layout/MediaLinks';
//Falta Mixcloud & Twitch


function Contacte() {
    return (
        <div className="bloqueContacto" id="contacte">
            {/* <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                /> */}
            <div className="contenedorContacto">
                <div className="newletterForm"><NewsletterForm /></div>
                <MediaLinks
                    fcbk="amebabarcelona"
                    insta="ameba_bcn"
                    twit="ameba_bcn"
                    yout="channel/UCH5ssfBCmgJ1IDM-pSn2cEg"
                />
                <div className="endingText">©2020 AMEBA<br />Associació de Música Electrònica de Barcelona - Tots els drets reservats</div>
            </div>
        </div>
    );
}

export default Contacte;