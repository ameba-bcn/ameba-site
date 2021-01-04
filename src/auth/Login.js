import React, { useState, useContext } from 'react'
import './Auth.css';
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function Login() {

    const { setUser } = useContext(UserContext);

    const [ displayError, setDisplayError ] = useState(null);

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

    const onCreateAccount = () => {
        history.push('/registration');
    }

    const onForgotPass = () => {
        history.push('/recovery-account');
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
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                    `Bearer ${localStorage.getItem('access_token')}`;
                setUser(localStorage.getItem('access_token'));
                setDisplayError(null);
                history.push('/login');
                // console.log(res)
                // console.log(res.data);
            })
            .catch(error => {
                console.log("ERROL", error.response)
                setDisplayError(`Error: ${error.response.data.detail}`);
            });
    }

    return (
        <div className="loginBox">
            <p className="loginTitle">INICIA SESSIÓ</p>
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        // value={this.state.email}
                        onChange={handleChange}
                        className="inputLoginEmail"
                        required />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="CONTRASENYA"
                        // value={this.state.password_confirmation}
                        onChange={handleChange}
                        className="inputLoginPassword"
                        required />
                </div>
                {displayError === null? null : <div className="errorLoginBox">{displayError}</div>}
                <button className="buttonLoginForm" type="submit">CONECTA'T</button>
            </form>
            <div className="logTextosLinkBox" >
                <span className="logTextosLink" onClick={onCreateAccount}>Crea un compte</span>
                <br />
                <span className="logTextosLink" onClick={onForgotPass}>Has oblidat la teva contraseña?</span>
            </div>
        </div>
    )
}