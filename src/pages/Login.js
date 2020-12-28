import React, { useState } from 'react'
import LoginComp from '../auth/Login'
// import Registration from '../auth/Registration'
// import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";
import LogoutComp from '../auth/Logout'
// https://dev.to/pnkfluffy/passing-data-from-child-to-parent-with-react-hooks-1ji3

export default function Login() {

    const [user, setUser] = useState(axiosInstance.defaults.headers['Autorization'])

    function getAuthValue() {
        console.log('state', user)
        console.log('axios', axiosInstance.defaults.headers['Autorization'])
    }

    return (
        <div className="loginWall">
            {/* <img src={Logo} alt="AMEBA logo" width="229" height="252"></img> */}
            <button className="print" onClick={() => getAuthValue()}>XXXXXXX</button>
            {/* <br />
            <p>{user}</p> */}

            {user === null ?
                <LoginComp login={username => setUser(username)} />
                :
                <LogoutComp logout={() => setUser(null)} user={user} />
            }
        </div>
    )
}
