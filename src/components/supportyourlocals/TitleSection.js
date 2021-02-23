import React from 'react';
import './TitleSection.css';

export default function TitleSection({ title }) {
    return (<>
        <hr className="hr-section"/>
        <div className="title-section-support">
            {title}
        </div>
        <hr className="hr-section"/>
    </>
    )
}
