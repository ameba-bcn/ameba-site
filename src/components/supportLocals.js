import React from 'react';
import GridNoticies from './noticies/gridNoticies'
import { Link } from 'react-router-dom'

export default function SupportLocals() {
    return (
        <div className="Bloque" id="locals">
            <GridNoticies className="gridNoticies"/>
            <div className="overlay">
            <Link to="/support" style={{ textDecoration: 'inherit', color: 'inherit' }}>#SUPPORT YOUR LOCALS</Link>
            </div>
        </div>
    );
}