import React from 'react'
import LettersMove from '../../components/layout/LettersMove';

export default function SubscriptionFinished() {
    return (
        <div>
            GRÀCIES!<br />Subscripció confirmada
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </div>
    )
}