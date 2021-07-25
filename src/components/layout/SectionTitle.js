import React from 'react';
import './SectionTitle.css'

function SectionTitle(props) {
    return (
        <div className="SectionTitleBox">
            <div className="SectionTitle" >{props.title} </div>
        </div>
    );
}

export default SectionTitle;