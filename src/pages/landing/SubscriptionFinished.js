import React from 'react'
import LettersMove from '../../components/layout/LettersMove';

export default function SubscriptionFinished() {
    return (
        <>
            <div className="full-height-msg">
                <div className="single-msg">GRÀCIES!<br />Subscripció confirmada</div>
            </div>
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </>
    )
}