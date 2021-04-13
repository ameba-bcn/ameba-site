import React from 'react'
import LettersMove from './../components/layout/LettersMove';

export default function ValidateEmail() {
    return (
        <div className="loginWall">
            Hem enviat un email de verificació. Valida-ho abans de continuar.
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </div>
    )
}
