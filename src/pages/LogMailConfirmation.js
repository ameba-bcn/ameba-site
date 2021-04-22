import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { validateEmail } from './../redux/actions/auth';
import LettersMove from './../components/layout/LettersMove';

export default function LogMailConfirmation(props) {

    const dispatch = useDispatch();
    const [hasQueryParams, setHasQueryParams] = React.useState(false);
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const strToken = parsed.token

    useEffect(() => {
        if (strToken) {
            dispatch(validateEmail(strToken))
            setHasQueryParams(true)
        }
    }, [strToken]);

    return (
        <div className="loginWall">
            {hasQueryParams ?
                <p>Compte verificat: Benvingut!</p> :
                <p>T'hem enviat un mail de confirmació, confirma l'enllaç</p>}
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#FAE6C5"
            />
        </div>
    )
}
