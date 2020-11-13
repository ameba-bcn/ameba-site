import React, { Component } from 'react'
import axios from "axios";
import './Auth.css';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("form submitted")
        // RAIL API: configurar la nuestra en particular
        axios.post("http:localhost:3001/registrations", {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        },
            { withCredentials: true }
        )
            .then(response => {
                console.log("registration res", response)
            })
            .catch(error => {
                console.log("registration error", error)
            })
        event.preventDefault();
    }
    render() {
        return (
            <div className="loginBox">
                <form onSubmit={this.handleSubmit}>
                    <div className="inputLoginEmail">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="inputLoginPassword">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="inputLoginPasswordConf">
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Password confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.handleChange}
                            required />
                    </div>

                    <button className="buttonLoginForm" type="submit">Register</button>
                </form>
            </div>
        )
    }
}
