import React, { useState } from 'react'
import Login from '../forms/Login';
import Register from '../forms/Register'

export default function LogComponent(props) {

    const [viewState, setViewState] = useState(props.viewState || "login");

    return (
        <div className="loginWall">
        {viewState === "registration" ? <Register viewState={viewState} setViewState={setViewState} /> :
          <Login isCheckout={false} viewState={viewState} setViewState={setViewState} />
        }
      </div>
    )
}
