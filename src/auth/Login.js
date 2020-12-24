import React, { useState } from 'react'
import './Auth.css';
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'


export default function Login({login}) {

    const [userName, setUserName] = useState("");

    const history = useHistory();

    const initialFormData = Object.freeze({
        email: '',
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

        axiosInstance.post(`token/`, {
            email: formData.email,
            password: formData.password,
        })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.access);
                axiosInstance.defaults.headers['Autorization'] =
                localStorage.getItem('access_token');
                setUserName(axiosInstance.defaults.headers['Authorization']);
                login(userName);
                history.push('/login');
                // console.log(res)
                // console.log(res.data);
            })
    }

    return (
        <div className="loginBox">
            <form onSubmit={handleSubmit}>
                <div className="inputLoginEmail">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        // value={this.state.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="inputLoginPassword">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        // value={this.state.password_confirmation}
                        onChange={handleChange}
                        required />
                </div>
                <button className="buttonLoginForm" type="submit">Login</button>
            </form>
        </div>
    )
}