import React from 'react';
import CheckoutStripeHandler from '../components/checkout/CheckoutStripeHandler';
import LettersMove from './../components/layout/LettersMove';

export default function Checkout() {
    return (
        <>
            <CheckoutStripeHandler isMemberRegistration={false}/>
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
        </>
    )
}
