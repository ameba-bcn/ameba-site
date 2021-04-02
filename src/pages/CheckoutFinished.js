import React from 'react';
import LettersMove from './../components/layout/LettersMove';


export default function CheckoutFinished() {
    return (
        <div>
            GRACIES!<br/>Hem rebut la teva comanda
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                />
        </div>
    )
}
