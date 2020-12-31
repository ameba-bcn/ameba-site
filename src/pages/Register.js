import React, { useContext } from 'react'
// import LoginComp from '../auth/Login'
// import LogoutComp from '../auth/Logout'
import Registration from '../auth/Registration'
// import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function Register() {

    const history = useHistory();

    const {user} = useContext(UserContext);

    const displayLogState = () => {
        console.log('user', user)
        console.log('axios', axiosInstance.defaults.headers['Autorization'])
    }

    const onGoToMain = () => {
        history.push('/');
    }

    return (
        <div className="loginWall">
            <button className="print" onClick={() => displayLogState()}>XXXXXXXX</button>
            <Registration />
            <div className="logTextosLinkBox">
                <span className="logTextosLink" onClick={onGoToMain}>Torna</span>
            </div>
        </div>
    )
}
