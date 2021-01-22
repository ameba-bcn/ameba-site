import React from 'react'

import { useHistory } from 'react-router-dom'

export default function LogMailConfirmation() {
    const history = useHistory();

    const confirmed = () => {
        history.push('/');
    }


    return (
        <div className="loginWall">
            <br />
            <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>
            <button className="print" onClick={confirmed}>Confirma mail</button>
        </div>
    )
}
