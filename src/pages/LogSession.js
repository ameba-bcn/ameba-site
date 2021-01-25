import React, { useContext } from 'react';
// import LoginComp from '../auth/Login';
// import LogoutComp from '../auth/Logout';
import Login from '../redux/components/Login'
import Register from '../redux/components/Register'
// import { UserContext } from '../UserContext';
// import { useDispatch, useSelector } from "react-redux";

export default function LogSession() {

    return (
        <div className="loginWall">
            <Register />
            <Login />
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