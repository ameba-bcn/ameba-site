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
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                />
            <SectionTitle title="properes activitats" />
            <Card3Grid className="Card3Block" />
            <div className="agendaLink">
                <NavLink className="navLinkActivitat" style={{ textDecoration: 'none' }}
                    to={{ pathname: '/activitats' }}>- - - &#62; VEURE AGENDA &#60; - - -</NavLink></div>
        </div>
    );
}

export default Activitats;