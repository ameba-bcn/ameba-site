import React from 'react';
import CheckoutMain from '../components/checkout/CheckoutMain';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LettersMove from './../components/layout/LettersMove';

const promise = loadStripe("pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep");

export default function Checkout() {
    return (
        <Elements stripe={promise}>
            <CheckoutMain />
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                />
        </Elements>
    )
}
