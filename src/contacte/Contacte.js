import React from 'react';
// import Container from '@material-ui/core/Container';
// import NewsletterForm from './NewsletterForm';
import NewsletterForm from './../components/forms/NewsletterForm'
import './Contacte.css';
import MediaLinks from '../components/layout/MediaLinks';
import LettersMove from './../components/layout/LettersMove';
//Falta Mixcloud & Twitch


function Contacte() {
    return (
        <div className="bloqueContacto" id="contacte">
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
                    <LettersMove
                        className="lettersMoveDiv"
                        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA " 
                        color="#F2C571"
                        />
        </div>
    );
}

export default Contacte;