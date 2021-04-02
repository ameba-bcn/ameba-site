import React from 'react'
// import { logout } from "../actions/auth"
// import { useDispatch } from "react-redux";


export default function SuccesfullLogin(props) {
    // const dispatch = useDispatch();
    return (
        <div className="succesful-login">
            <div className="succesful-login-nom">{props.nom}</div>
            <div className="succesful-login-email">{props.email}</div>
            {/* <div className="btn-block succesful-login-modificar" onClick={()=>dispatch(logout())}>MODIFICAR</div> */}
        </div>
    )
}
