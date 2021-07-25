import React from 'react';
import './PowerTitle.css'

function PowerTitle(props) {
    return (
        <div className="BGWrapper">
            <div className="PowerTitle" >{props.title} </div>
        </div>
    );
}

export default PowerTitle;