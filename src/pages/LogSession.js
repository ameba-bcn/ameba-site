import React, { useState } from 'react';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
// import RegisterForm from './../components/forms/RegisterForm'
// import LoginForm from './../components/forms/LoginForm'
import LettersMove from './../components/layout/LettersMove'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    cart: state.cart.cart_data,
    isLoggedIn: state.auth.isLoggedIn
  };
};

function LogSession(props) {

  const [viewState, setViewState] = useState(props.viewState || "login");

  return (<>
    <div className="loginWall">
      {viewState === "registration" ? <Register viewState={viewState} setViewState={setViewState} /> :
        <Login isCheckout={false} viewState={viewState} setViewState={setViewState} />
      }
    </div>
    <LettersMove
      className="lettersMoveDiv"
      sentence="FES-TE SOCI/A "
      color="#EB5E3E"
    />
  </>
  )
}

export default connect(mapStateToProps)(LogSession);