import React from 'react';
import Card3Grid from './layout/Card3grid';
import SectionTitle from './layout/SectionTitle';

function Activitats() {
    return (
        <div className="Bloque" id="activitats">
            <SectionTitle title="properes activitats"/>
            <Card3Grid className="Card3Block"/>
        </div>
    );
}

export default Activitats;