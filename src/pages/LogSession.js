import React, { useContext, useState } from 'react';
// import LoginComp from '../auth/Login';
// import LogoutComp from '../auth/Logout';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
import PasswordRecovery from '../redux/components/PasswordRecovery'
// import { UserContext } from '../UserContext';
// import { useDispatch, useSelector } from "react-redux";

export default function LogSession() {

    const [viewState, setViewState] = useState("login");

    return (
        <div className="loginWall">
            {viewState==="registration"?<Register viewState={viewState} setViewState={setViewState}/>:
            (viewState==="recover"?<PasswordRecovery viewState={viewState} setViewState={setViewState}/>:
            <Login viewState={viewState} setViewState={setViewState}/>
            )}
        </div>
    )
}

// import React, { useContext } from 'react';
// import LoginComp from '../auth/Login';
// import LogoutComp from '../auth/Logout';
// import { UserContext } from '../UserContext';

// export default function LogSession() {

//     const { user } = useContext(UserContext);

//     return (
//         <div className="loginWall">
//             {user === null ?
//                 <LoginComp />
//                 :
//                 <LogoutComp />
//             }
//         </div>
//     )
// }