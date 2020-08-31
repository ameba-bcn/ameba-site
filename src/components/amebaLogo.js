import React from "react";
import logo from '../images/ameba-logo.png';

export default class AmebaLogo extends React.Component{
    render(){
        return(
            <div>
                <img src={logo} alt="logo" />
            </div>
        )
    }
}