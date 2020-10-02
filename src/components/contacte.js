import React from 'react';
import Container from '@material-ui/core/Container';
import NewsletterForm2 from './newsletterForm2';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
//Falta Mixcloud & Twitch


function Contacte() {
    return (
        <div className="BloqueContacto" id="contacte">
            <Container maxWidth="sm">
                <div className=""><NewsletterForm2 /></div>
                <div className=""><FacebookIcon /><InstagramIcon /><TwitterIcon /><YouTubeIcon /></div>
                <div>©2020 AMEBA<br />Associació de Música Electrònica de Barcelona - Tots els drets reservats</div>
            </Container>
            {/* <div className="wordsMoveFrame">
                <div className="wordsMove">
                    FES-TE SOCI 
                    </div>
            </div> */}
        </div>
    );
}

export default Contacte;