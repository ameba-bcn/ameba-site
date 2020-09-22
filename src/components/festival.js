import React from 'react';
import CenteredImage from './layout/centeredImageTopTitle'
// import fotoParkfest from '../images/PARKFEST.jpg';

function Festival() {
    return (
        <div className="Bloque" id="festi">
            <CenteredImage
                titulo='PARKFEST'
                subtitulo='Vine a ballar amb nosaltres!'
                cssClass="titleCoverCanvas"
                wrapper="festi"
            />
        </div>
    );
}

export default Festival;