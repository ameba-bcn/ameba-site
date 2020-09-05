import React from 'react';
// import BasicStructure from '../components/layout/basicStructure';
import MainCarousel from '../components/layout/carousel';

function Activitats() {
    return (
        <div className="Bloque" id="activitats">
            <MainCarousel/>
            {/* <BasicStructure wrapper="activitats" titulo='ACTIVITATS' subtitulo='Vols conèixer?' link="Activitats" buttonText="Veure activitats" /> */}
        </div>
    );
}

export default Activitats;