import React, { useContext, useState } from 'react'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext';
import './Auth.css';

const API_URL = process.env.REACT_APP_API_HOST || "http://localhosts/api/";

export default function Logout() {

    const { user, setUser } = useContext(UserContext);
    
    const [displayError, setDisplayError] = useState(null);

    const history = useHistory();

    const logoutUser = () => {

        if (axiosInstance.defaults.headers['Authorization'] === null) {
            console.log("Already deleted")
        } else {
            axiosInstance.delete(API_URL + 'token/',
            {
                data: {
                    refresh: localStorage.getItem('refresh_token')
                }})
                .then((res) => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    axiosInstance.defaults.headers["Authorization"] = null;
                    setUser(null)
                    setDisplayError(null);
                    // console.log(res)
                    // console.log(res.data);
                    history.push('/login');
                    console.log("user", user)
                    console.log("axios", axiosInstance.defaults.headers["Authorization"])
                })
                .catch(error => {
                    console.log("ERROL", error.response)
                    setDisplayError(`Error: ${error.response === undefined? error.response : error.response.data.detail}`);
                })
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