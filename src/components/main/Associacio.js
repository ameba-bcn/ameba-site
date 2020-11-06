import React from 'react';
import './Associacio.css';
import LettersMove from './../layout/lettersMove';

function Associacio() {
    return (
        <div className="Bloque" id="asso">
            {/* <div className="mainFlyer" /> */}
            <LettersMove
                className="lettersMoveAsso"
                sentence="ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA" 
                />
        </div>
    );
}

export default Associacio;