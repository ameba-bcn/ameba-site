import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutMain from './CheckoutMain';
import CheckoutMember from './CheckoutMember';

const promise = loadStripe("pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep");

export default function CheckoutStripeHandler(props) {
    const {isMemberRegistration} = props;
    // const cart = useSelector(state => state.cart)
    // const { cart_data = {} } = cart
    // const { state = {} } = cart_data;
    // const { needs_checkout, has_subscriptions, has_article } = state;
    const profile = useSelector(state => state.profile)
    const { user_profile = "" } = profile
    return (
        <Elements stripe={promise} >{isMemberRegistration ? <CheckoutMember /> : <CheckoutMain />}</Elements>
    )
}
