import React from 'react'
import LettersMove from './../components/layout/LettersMove';

export default function ValidateEmail() {
    return (
        <>
            <div className="full-height-msg">
                <div className="single-msg">Hem enviat un email de verificació. Valida-ho abans de continuar.</div>
            </div>
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </>
    )
}
