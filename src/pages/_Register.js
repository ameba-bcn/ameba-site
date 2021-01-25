import React, { useContext } from 'react'
import Registration from '../auth/Registration'
// import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
// import { UserContext } from '../UserContext';

export default function Register() {

    const history = useHistory();

    // const { user } = useContext(UserContext);

    // function getAuthValue() {
    //     console.log('user', user)
    //     console.log('axios', axiosInstance.defaults.headers['Authorization'])
    // }

    const onGoToMain = () => {
        history.push('/');
    }

    return (
        <div className="loginWall">
            {/* <button className="print" onClick={() => getAuthValue()}>XXXXXXX</button> */}
            <Registration />
            <div className="logTextosLinkBox">
                <span className="logTextosLink" onClick={onGoToMain}>Torna</span>
            </div>
        </div>
    )
}
