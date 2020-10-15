import React from 'react';
import GridNoticies from './noticies/gridNoticies'
import { Link } from 'react-router-dom'

export default function SupportLocals() {
    return (
        <div className="Bloque" id="locals">
            <GridNoticies className="gridNoticies" />
            <div className="overlay">
                <Link to="/support" style={{ textDecoration: 'inherit' }}>
                    <div className="overlayTitle">
                        #SUPPORT YOUR LOCALS
                </div>
                    <div className="overlaySubtitle">
                        conèix als artistes que donen vida a l'escena de la ciutat
                </div>
                </Link>
            </div>
        </div>
    );
}