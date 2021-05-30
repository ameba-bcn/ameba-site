import React, { Component } from 'react';
import LettersMove from './../components/layout/LettersMove';
// import { ButtonBackToHome } from '../components/ButtonBackToHome'

export default class NotFound extends Component {
    render() {
        return (
            <>
                <div className="full-height-msg">
                    <div className="single-msg">404!</div>
                    <div className="single-msg">Pagina no encontrada</div>
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