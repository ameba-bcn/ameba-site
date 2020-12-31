import React from 'react'
import Logo from './../images/amebaLogo.png'
import { useHistory } from 'react-router-dom'

export default function PasswordRecovery() {

    const history = useHistory();

    const onGoToLog = () => {
        history.push('/login');
    }

    return (
        <div className="loginWall">
            <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>
            <br />
            <p>RECUPERACIÓ CONTRASSENYA PENDENT DE IMPLEMENTAR</p>
            <div className="logTextosLinkBoz">
                <span className="logTextosLink" onClick={onGoToLog}>Torna</span>
            </div>
        </div>
    )
}