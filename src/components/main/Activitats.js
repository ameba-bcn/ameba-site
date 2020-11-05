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
            <NavLink className="navLinkActivitat"style={{ textDecoration: 'none' }} 
                to={{pathname:'/activitats'}}><div className="agendaLink">- - - &#62; AGENDA &#60; - - -</div></NavLink>
        </div>
    );
}

export default Activitats;