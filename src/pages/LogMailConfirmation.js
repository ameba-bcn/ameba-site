import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
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
            dispatch(validateEmail(strToken)).then(
                setHasQueryParams(true)
            )
        }
    }, [strToken]);

    if (localStorage.getItem("view") === "new_member" && setHasQueryParams) {
        return <Redirect to='/membership-registration' />;
    }

    return (<>
        <div className="full-heigh-msg">
            {hasQueryParams ?
                <div className="single-msg">Compte verificat: Benvingut!</div> :
                <div className="single-msg">T'hem enviat un mail de confirmació, confirma l'enllaç</div>}
        </div>
        <LettersMove
            className="lettersMoveDiv"
            sentence="FES-TE SOCI/A "
            color="#FAE6C5"
        />
    </>
    )

}
