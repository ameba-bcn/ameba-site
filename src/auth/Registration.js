import React, { useState } from 'react'
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import './Auth.css';

export default function Registration() {

    const history = useHistory();

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
                console.log("in registration")
                history.push('/logconf');
                console.log(res)
                console.log(res.data);
            })
            .catch(error => {
                console.log(error.response)
            });
    }
    return (
        <div className="loginBox">
            <form onSubmit={handleSubmit}>
                <div className="inputLoginEmail">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        // value={state.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="inputLoginUser">
                    <input
                        type="username"
                        name="username"
                        placeholder="User"
                        // value={state.user}
                        onChange={handleChange}
                        required />
                </div>
                <div className="inputLoginPassword">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        // value={state.password}
                        onChange={handleChange}
                        required />
                </div>

                <button className="buttonLoginForm" type="submit">Register</button>
            </form>
        </div>
    )

}
