import React, { useState } from 'react';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
import PasswordRecovery from '../redux/components/PasswordRecovery'

export default function LogSession() {

    const [viewState, setViewState] = useState("login");

    return (
        <div className="loginWall">
            {viewState==="registration"?<Register viewState={viewState} setViewState={setViewState}/>:
            (viewState==="recover"?<PasswordRecovery viewState={viewState} setViewState={setViewState}/>:
            <Login viewState={viewState} setViewState={setViewState}/>
            )}
        </div>
    )
}