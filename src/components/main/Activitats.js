import React from 'react';
import Card3Grid from '../layout/Card3grid';
import SectionTitle from '../layout/SectionTitle';
import { NavLink, Redirect } from 'react-router-dom';
import './Activitats.css'

function Activitats() {
    return (
        <div className="Bloque" id="activitats">
            <SectionTitle title="properes activitats"/>
            <Card3Grid className="Card3Block"/>
            <div className="agendaLink">
            <NavLink className="navLinkActivitat"style={{ textDecoration: 'none' }} 
                to={{pathname:'/activitats'}}>- - - &#62; AGENDA &#60; - - -</NavLink></div>
        </div>
    );
}

export default Activitats;