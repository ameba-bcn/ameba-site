import React from 'react';
import PaymentForm from './../forms/PaymentForm';
import useCartStore from "../../stores/useCartStore";

function CheckoutMemberPayment() {
    const { cart_data = {} } = useCartStore();
    const { item_variants = [], total } = cart_data;
    return (
        <div>
            <div className="checkout-payment-summary row">
                <div className="column">
                    {item_variants[0]?.name}
                </div>
                <div className="column">
                    Price: {total}
                </div>
            </div>
            <PaymentForm  />
        </div>
    )
}

export default CheckoutMemberPayment;