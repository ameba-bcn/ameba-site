import React from 'react'
import LoginComp from '../auth/Login'
import LogoutComp from '../auth/Logout'
import Registration from '../auth/Registration'
import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";

export default function Login() {

    // const jwt = require('jsonwebtoken');

    return (
        <div className="loginWall">
            <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>
            <br/>
            <p>{axiosInstance.defaults.headers['Autorization']}</p>
            <p>REGISTRATION</p>
            <Registration />
            <p>LOGIN</p>
            <LoginComp />
            <LogoutComp/>
        </div>
    )
}
