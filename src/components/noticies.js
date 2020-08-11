import React from 'react';
import GridNoticies from './noticies/gridNoticies'
import { Link } from 'react-router-dom'

function Noticies() {
    return (
        <div className="Bloque" id="noti">
            <GridNoticies className="gridNoticies"/>
            <div class="overlay">
            <Link to="/blog" style={{ textDecoration: 'none', color: 'white' }}>#SUPPORT YOUR LOCALS</Link>
            </div>
        </div>
    );
}

export default Noticies;