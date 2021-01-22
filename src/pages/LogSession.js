import React, { useContext } from 'react';
import LoginComp from '../auth/Login';
import LogoutComp from '../auth/Logout';
import { UserContext } from '../UserContext';
import { useDispatch, useSelector } from "react-redux";

export default function LogSession() {

    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        <div className="loginWall">
            {currentUser ?
                <LoginComp />
                :
                <LogoutComp />
            }
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