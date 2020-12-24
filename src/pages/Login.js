import React, {useState} from 'react'
import LoginComp from '../auth/Login'
import Registration from '../auth/Registration'
import Logo from './../images/amebaLogo.png'
import axiosInstance from "../axios";
import LogoutComp from '../auth/Logout'


export default function Login() {

    const [user, setUser] = useState(axiosInstance.defaults.headers['Autorization'])

    function getAuthValue(){
        console.log('state',user)
        console.log('axios',axiosInstance.defaults.headers['Autorization'])
    }

    return (
        <div className="loginWall">
            <img src={Logo} alt="AMEBA logo" width="229" height="252"></img>
            <button className="print" onClick={() => getAuthValue()}>XXXXXXXX</button>
            <br />
            <p>{user}</p>

            {user === null ?
                <>
                    <p>REGISTRATION</p>
                    <Registration />
                    <p>LOGIN</p>
                    <LoginComp login={username => setUser(username)}/>
                </> : <><p>LOGOUT</p>
                    <LogoutComp logout={() => setUser(null)} user={user}/>
                </>}
        </div>
    )
}
