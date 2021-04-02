import React, { useState } from 'react';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
import PasswordRecovery from '../redux/components/PasswordRecovery';
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
      {viewState === "registration" || (viewState === "registration" && !!props.cart) ? <Register viewState={viewState} setViewState={setViewState} /> :
        (viewState === "recover" ? <PasswordRecovery viewState={viewState} setViewState={setViewState} /> :
          <Login isCheckout={false} viewState={viewState} setViewState={setViewState} />
        )}
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