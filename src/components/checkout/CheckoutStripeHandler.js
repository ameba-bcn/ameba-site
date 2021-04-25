import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutMain from './CheckoutMain';
import CheckoutMember from './CheckoutMember';

const promise = loadStripe("pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep");

export default function CheckoutStripeHandler(props) {

    const { isNewMember } = props;
    return (
        <Elements stripe={promise} >{isNewMember ? <CheckoutMember {...props}/> : <CheckoutMain />}</Elements>
    )
}
