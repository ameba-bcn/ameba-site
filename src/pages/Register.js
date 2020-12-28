import React from 'react'
// import LoginComp from '../auth/Login'
// import LogoutComp from '../auth/Logout'
import Registration from '../auth/Registration'
import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'

export default function Register() {

    const history = useHistory();

    const displayLogState = () => {
        console.log(axiosInstance.defaults.headers['Authorization']);
    }

    const onGoToMain = () => {
        history.push('/');
    }


    return (
        <div className="loginWall">
            {/* <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>
            <button className="print" onClick={() => displayLogState()}>XXXXXXXX</button>
            <br />
            <p>REGISTRATION</p> */}
            <Registration />
            <span className="logTextosLink" onClick={onGoToMain}>Torna</span>
        </div>
    )
}
