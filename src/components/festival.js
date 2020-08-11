import React from 'react';
import AlphaBlock from './layout/alphaBlock'
import AmebaLogo from './amebaLogo'


function Festival() {
    return (
    <div className="Bloque" id="festi"> 
    <AlphaBlock 
        titulo='Titulo'
        subtitulo='Sustitulo'
        parrafo='BHKGHVHVAkjabjkjjkbasdkjasdkjas'
        button='Aqui hi ha un botó'
        imatge= {{AmebaLogo}}
        wrapper="festi"
    />
    </div>
    );
}

export default Festival;