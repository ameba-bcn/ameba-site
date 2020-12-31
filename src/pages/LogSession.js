import React, { useContext } from 'react';
import LoginComp from '../auth/Login';
// import Registration from '../auth/Registration'
// import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";
import LogoutComp from '../auth/Logout';
import { UserContext } from '../UserContext';
// https://dev.to/pnkfluffy/passing-data-from-child-to-parent-with-react-hooks-1ji3

export default function LogSession() {

    const { user } = useContext(UserContext);

    function getAuthValue() {
        console.log('user', user)
        console.log('axios', axiosInstance.defaults.headers['Autorization'])
    }

    return (
        <div className="loginWall">
            <button className="print" onClick={() => getAuthValue()}>XXXXXXX</button>
            {user === null ?
                <LoginComp />
                :
                <LogoutComp />
            }
        </div>
    )
}
