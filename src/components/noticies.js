import React from 'react';
import GridNoticies from './noticies/gridNoticies'
import { Link } from 'react-router-dom'

function Noticies() {
    return (
        <div className="Bloque" id="noti">
            <GridNoticies className="gridNoticies"/>
            <div className="overlay">
            <Link to="/blog" style={{ textDecoration: 'inherit', color: 'inherit' }}>#SUPPORT YOUR LOCALS</Link>
            </div>
        </div>
    );
}

export default Noticies;