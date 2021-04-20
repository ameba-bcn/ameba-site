import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { passwordRecovery } from './../redux/actions/auth';
import { useHistory } from 'react-router-dom';
import PasswordRecoverForm from './../components/forms/PasswordRecoverForm';
import LettersMove from './../components/layout/LettersMove';

export default function PasswordRecovery(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hasQueryParams, setHasQueryParams] = React.useState(false);
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const strToken = parsed.token

    useEffect(() => {
        if (strToken) {
            dispatch(passwordRecovery(strToken))
            setHasQueryParams(true)
            setTimeout(() => {
                history.push('/');
            }, 3000);
        }
    }, [strToken]);

    return (
        <div className="loginWall">
            {hasQueryParams ?
                <p>Contrasenya recuperada</p> :
                <PasswordRecoverForm />}
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#FAE6C5"
            />
        </div >
    )
}