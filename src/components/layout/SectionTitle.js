import React from 'react';
import './SectionTitle.css'

function SectionTitle(props) {
    return (
        <div className="SectionTitleBox">
            <hr className="separadorTop" />
            <div className="SectionTitle" >{props.title} </div>
            <hr className="separadorTop" />
        </div>
    );
}

export default SectionTitle;