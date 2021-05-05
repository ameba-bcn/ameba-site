import React, { Component } from 'react';
import LettersMove from './../components/layout/LettersMove';
// import { ButtonBackToHome } from '../components/ButtonBackToHome'

export default class NotFound extends Component {
    render() {
        return (
        <>
            <div>
                <h1 className="title">404!</h1>
                <h2 className="subtitle">Pagina no encontrada</h2>
            </div>
                <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
              />
            </>
        )
    }
}