import React, { useState } from 'react'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import './Auth.css';

export default function Registration() {

    const history = useHistory();

    const [displayError, setDisplayError] = useState(null);

    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    })

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            //Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        let data = JSON.stringify({
            password: formData.password,
            username: formData.username,
            email: formData.email
        })

        axiosInstance.post(`users/`, data)
            .then((res) => {
                history.push('/logconf');
                console.log("in registration")
                setDisplayError(null);
                console.log(res.data);
            })
            .catch(error => {
                console.log("ERROL", error.response)
                setDisplayError(`Error: ${error.response.data.detail}`);

            });
    }
    return (
        <div className="loginBox">
            <p className="loginTitle">REGISTRA'T</p>
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        // value={state.email}
                        onChange={handleChange}
                        className="inputLoginEmail"
                        required />
                </div>
                <div>
                    <input
                        type="username"
                        name="username"
                        placeholder="USUARI"
                        // value={state.user}
                        onChange={handleChange}
                        className="inputLoginUser"
                        required />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="CONTRASENYA"
                        // value={state.password}
                        onChange={handleChange}
                        className="inputLoginPassword"
                        required />
                </div>
                {displayError === null ? null : <div className="errorLoginBox">{displayError}</div>}
                <button className="buttonLoginForm" type="submit">Crea</button>
            </form>
        </div>
    )

}
