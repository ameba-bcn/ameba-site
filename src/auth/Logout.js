import React, { useState } from 'react'
import './Auth.css';
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'

export default function Logout({ logout, user }) {

    const history = useHistory();

    const initialTokenData = Object.freeze({
        refresh: ''
    })

    const [tokenData, updateTokenData] = useState(initialTokenData);

    const initiateLogout = () => {
        updateTokenData({
            ...tokenData,
            //Trimming any whitespace
            refresh: localStorage.getItem('access_token'),
        })
        // logoutUser();
    }

    const logoutUser = () => {
        // initiateLogout();
        if (axiosInstance.defaults.headers['Authorization'] === null) {
            console.log("Already deleted")
        } else {
            // localStorage.setItem('refresh_token', res.data.access);
            console.log("Token data", tokenData.refresh)
            axiosInstance.delete(`token/`, {
                refresh: localStorage.getItem('access_token')
            })
                .then((res) => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    axiosInstance.defaults.headers['Authorization'] = null;
                    logout();
                    updateTokenData("")
                    // console.log(res)
                    // console.log(res.data);
                    history.push('/login');
                    console.log("user", user)
                    console.log("axios", axiosInstance.defaults.headers['Authorization'])
                })
                .catch(error => {
                    console.log("ERROL", error.response)
                });
        }
    }

    return (
        <div>
            <p className="loginTitle">JA MARXES?</p>
            <button className="buttonLoginForm" onClick={logoutUser}>Desconecta't</button>
        </div>
    )
}