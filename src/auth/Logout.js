import React from 'react'
import './Auth.css';
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'

export default function Logout({logout, user}) {

    const history = useHistory();

    const logoutUser = () => {
        if (axiosInstance.defaults.headers['Authorization'] === null) {
            console.log("Already deleted")
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            logout();
            history.push('/login');
            console.log("user",user)
            console.log("axios",axiosInstance.defaults.headers['Authorization'])
        }
    }

    return (
        <div>
            <button className="buttonLoginForm" onClick={logoutUser}>Logout</button>
        </div>
    )
}