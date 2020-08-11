import React from "react";

export default class AmebaLogo extends React.Component{
    render(){
        return(
            <div>
                <img src={process.env.PUBLIC_URL + '/ameba-logo.png'} alt="logo" />
            </div>
        )
    }
}