import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { validateEmail } from './../redux/actions/auth';
import { useHistory } from 'react-router-dom'

export default function LogMailConfirmation(props) {

    const dispatch = useDispatch();
    const [hasQueryParams, setHasQueryParams] = React.useState(false);
    const history = useHistory();
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const strToken = parsed.token

    useEffect(() => {
        if (strToken) {
            dispatch(validateEmail(strToken))
            setHasQueryParams(true)
            setTimeout(() => {
                history.push('/');
            }, 3000);
        }
    }, [strToken]);

    return (
        <div className="loginWall">
            {hasQueryParams ?
                <p>Compte verificat: Benvingut!</p> :
                <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>}
        </div>
    )
}
