import React from 'react'
import LoginComp from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import Logo from './../images/amebaLogo.png'

export default function Login() {
    return (
        <div className="loginWall">
            <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>

            <Registration />
            <br/>
            {/* <LoginComp /> */}
        </div>
    )
}
