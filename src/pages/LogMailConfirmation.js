import React from 'react'
import { useDispatch } from "react-redux";
import { validateEmail } from './../redux/actions/auth';

import { useHistory } from 'react-router-dom'

export default function LogMailConfirmation(props) {
    // http://localhost/logconf?search=22222

    const dispatch = useDispatch();

    const history = useHistory();

    const confirmed = () => {
        dispatch(validateEmail())
        history.push('/');
    }


console.log("queryparamsss",props.location.search)
    return (
        <div className="loginWall">
            <br />
            <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>
            <button className="print" onClick={confirmed}>Confirma mail</button>
        </div>
    )
}
