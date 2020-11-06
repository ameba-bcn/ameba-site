import React from 'react';
import Card3Grid from '../layout/Card3grid';
import SectionTitle from '../layout/SectionTitle';
import { NavLink } from 'react-router-dom';
import LettersMove from './../layout/lettersMove';
import './Activitats.css'

function Activitats() {
    return (
        <div className="Bloque" id="activitats">
            <LettersMove
                className="lettersMoveDiv"
                sentence="ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA" 
                />
            <SectionTitle title="properes activitats" />
            <Card3Grid className="Card3Block" />
            <div className="agendaLink">
                <NavLink className="navLinkActivitat" style={{ textDecoration: 'none' }}
                    to={{ pathname: '/activitats' }}>- - - &#62; AGENDA &#60; - - -</NavLink></div>
            <LettersMove
                className="lettersMoveDiv"
                sentence="ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA" 
                />
        </div>
    );
}

export default Activitats;