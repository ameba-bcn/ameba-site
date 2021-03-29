import React, { useState } from 'react';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
import PasswordRecovery from '../redux/components/PasswordRecovery'
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
      cart: state.cart.cart_data,
      isLoggedIn: state.auth.isLoggedIn
    };
  };

function LogSession(props) {

    const [viewState, setViewState] = useState(!!props.cart?"registration":"login");
console.log("XXXXXXXXXXXXXXXXXX", props.cart)
    // if (props.cart?.id !== ""){
    //     setViewState("registration")
    // }

    return (
        <div className="loginWall">
            {viewState==="registration"?<Register viewState={viewState} setViewState={setViewState}/>:
            (viewState==="recover"?<PasswordRecovery viewState={viewState} setViewState={setViewState}/>:
            <Login viewState={viewState} setViewState={setViewState}/>
            )}
        </div>
    )
}

export default connect(mapStateToProps)(LogSession);