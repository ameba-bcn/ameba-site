import React from 'react';
import { useSelector } from "react-redux";
import CheckoutStripeHandler from '../components/checkout/CheckoutStripeHandler';
import LettersMove from './../components/layout/LettersMove';

export default function MemberRegistration() {
    const logState = useSelector(state => state.auth)
    const { isLoggedIn = "" } = logState
    return (
        <>
            <CheckoutStripeHandler isLoggedIn={isLoggedIn} isMemberRegistration={true} />
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </>
    )
}