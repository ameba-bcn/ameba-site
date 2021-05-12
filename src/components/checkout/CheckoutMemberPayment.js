import React from 'react';
import { connect } from "react-redux";
import PaymentForm from './../forms/PaymentForm';

const mapStateToProps = state => {
    return {
      cart: state.cart.cart_data
    };
  };

function CheckoutMemberPayment(props) {
    const { cart_items, total} = props.cart;
    return (
        <div>
            <div className="checkout-payment-summary row">
                <div className="column">
                    {cart_items[0].name}
                </div>
                <div className="column">
                    Price: {total}
                </div>
            </div>
            <PaymentForm  />
        </div>
    )
}

export default connect(mapStateToProps)(CheckoutMemberPayment);