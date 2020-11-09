import React from 'react';
import './Associacio.css';
import LettersMove from './../layout/lettersMove';

function Associacio() {
    return (
        <div className="Bloque" id="asso">
            {/* <div className="mainFlyer" /> */}
            <LettersMove
                className="lettersMoveAsso"
                sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA " 
                color="#FAE6C5"
                />
        </div>
    );
}

export default Associacio;