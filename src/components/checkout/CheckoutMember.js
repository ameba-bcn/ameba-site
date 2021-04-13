import React, {useState} from 'react';
import MembershipForm from './../forms/MembershipForm';
import PaymentForm from './../forms/PaymentForm';

export default function CheckoutMember() {
    const [paymentReady, setPaymentReady] = useState(false); 
    return (
        <div>{!paymentReady?
            <MembershipForm isSubmitted={setPaymentReady}/>:
            <PaymentForm/>}
        </div>
    )
}
