import React from 'react'

export default function SuccesfullLogin(props) {
    return (
        <div className="succesful-login">
            <div className="logTitle">Login correcte</div>
            <div className="succesful-login">Usuari: {props.nom}</div>
            <div className="succesful-login">Email: {props.email}</div>
        </div>
    )
}
