import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import MembershipForm from './../forms/MembershipForm';
import Login from './../../redux/components/Login';
// import PaymentForm from './../forms/PaymentForm';
import { checkoutCart, addToCart } from './../../redux/actions/cart';
import CheckoutMemberPayment from './CheckoutMemberPayment';

const mapStateToProps = state => {
    return {
        cart: state.cart.cart_data,
        isLoggedIn: state.auth.isLoggedIn,
        //   stripe: state.cart.stripe
    };
};

function CheckoutMember(props) {
    const [accountCreated, setAccountCreated] = useState(false);
    const [paymentReady, setPaymentReady] = useState(false);
    const [viewState, setViewState] = useState("");
    const [displayError, setDisplayError] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (viewState === "membershipPayment") {
            console.log("Hey yo")
            dispatch(addToCart("1")).then(() => {
                dispatch(checkoutCart()).then(() => setPaymentReady(true))
            }).catch(() => {
                console.log("Algo ha ido muy mal tito...")
                setDisplayError(true)
            }
            )
            // setViewState("membershipPaymentPending")
        }
    }, [viewState]);


    // if (viewState === "membershipPaymentPending") setPaymentReady(true)

    return (
        <div><div className="new-member-title">Fes-te Soci</div>
            {
                paymentReady ?
                    <CheckoutMemberPayment />
                    :
                    (localStorage.getItem("view") === "new_member" ?
                        <Login isCheckout={false} isNewMember={true} viewState={viewState} setViewState={setViewState} />
                        : <MembershipForm isSubmitted={setAccountCreated} />)
            }
            {(displayError && message) && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
        </div>
    )
}

export default connect(mapStateToProps)(CheckoutMember);