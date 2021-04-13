import React from 'react';
import CheckoutStripeHandler from '../components/checkout/CheckoutStripeHandler';
import LettersMove from './../components/layout/LettersMove';

export default function MemberRegistration() {
    return (
        <>
            <CheckoutStripeHandler isNewMember={true} />
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </>
    )
}