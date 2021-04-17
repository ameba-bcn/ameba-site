import React from 'react'
import { useDispatch } from "react-redux";
import { validateEmail } from './../redux/actions/auth';

import { useHistory } from 'react-router-dom'

export default function LogMailConfirmation(props) {
    // http://localhost/activate/?token=22222

    const dispatch = useDispatch();

    const history = useHistory();
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const strToken = parsed.token

    const confirmed = (strToken) => {
        dispatch(validateEmail(strToken))
        history.push('/');
    }
    // new URLSearchParams(this.props.location.search).get("__firebase_request_key")
    console.log("queryparamsss", parsed)
    return (
        <div className="loginWall">
            <br />
            <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>
            <button className="print" onClick={() =>confirmed(strToken)}>Confirma mail</button>
        </div>
    )
}
