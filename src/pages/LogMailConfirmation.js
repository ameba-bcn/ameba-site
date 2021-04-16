import React from 'react'
import { useDispatch } from "react-redux";
import { validateEmail } from './../redux/actions/auth';

import { useHistory } from 'react-router-dom'

export default function LogMailConfirmation(props) {
    // http://localhost/activate/?token=22222

    const dispatch = useDispatch();

    const history = useHistory();

    const confirmed = (tkn) => {
        dispatch(validateEmail(tkn))
        history.push('/');
    }
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    // new URLSearchParams(this.props.location.search).get("__firebase_request_key")
    console.log("queryparamsss", parsed)
    const strToken = parsed.token
    return (
        <div className="loginWall">
            <br />
            <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>
            <button className="print" onClick={() =>confirmed(strToken)}>Confirma mail</button>
        </div>
    )
}
