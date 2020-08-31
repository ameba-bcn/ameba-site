import React from 'react';
import PowerTitle from './layout/powerTitle';
import Image from '../images/ameba-logo.png';


const stylesBack = {
    amebaBackground: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 100,
    }
};

function Colaboradors() {
    return (
        <div className="Bloque" id="colabo" style={stylesBack.amebaBackground}>
            <PowerTitle title="COLABOS" />
        </div>
    );
}

export default Colaboradors;