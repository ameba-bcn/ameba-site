import React from 'react'
// import LoginComp from '../auth/Login'
import LogoutComp from '../auth/Logout'
// import Registration from '../auth/Registration'
import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";

export default function Logout() {

    // const jwt = require('jsonwebtoken');
    const displayLogState = () => {
        console.log(axiosInstance.defaults.headers['Authorization']);
    }


    return (
        <div className="loginWall">
            <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>
            <button className="print" onClick={() => displayLogState()}>XXXXXXXX</button>
            <br />
            <p>{axiosInstance.defaults.headers['Authorization']}</p>
            <p>LOGOUT</p>
            <LogoutComp/>
        </div>
    )
}
