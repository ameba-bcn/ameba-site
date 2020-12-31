import React, { useContext, useState } from 'react'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext';
import './Auth.css';

export default function Logout() {

    const { user, setUser } = useContext(UserContext);
    
    const [displayError, setDisplayError] = useState(null);

    const history = useHistory();

    const logoutUser = () => {

        if (axiosInstance.defaults.headers['Authorization'] === null) {
            console.log("Already deleted")
        } else {

            axiosInstance.delete('http://localhost/api/', { data: { refresh: localStorage.getItem('access_token') } }
            )
                .then((res) => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    axiosInstance.defaults.headers['Authorization'] = null;
                    setUser(null)
                    setDisplayError(null);
                    // console.log(res)
                    // console.log(res.data);
                    history.push('/login');
                    console.log("user", user)
                    console.log("axios", axiosInstance.defaults.headers['Authorization'])
                })
                .catch(error => {
                    console.log("ERROL", error.response)
                    setDisplayError(`Error: ${error.response.data.detail}`);
                });
        }
    }

    return (
        <div>
            <p className="loginTitle">JA MARXES?</p>
            {displayError === null ? null : <div className="errorLoginBox">{displayError}</div>}
            <button className="buttonLoginForm" onClick={logoutUser}>Desconecta't</button>
        </div>
    )
}