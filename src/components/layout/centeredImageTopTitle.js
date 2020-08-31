import React from 'react';
// import { Link } from 'react-router-dom'


function CenteredImage(props) {
    return (
        <div className={props.cssClass}>
            <div className="titleCoverImage">
                {/* <h1><Link style={{ textDecoration: "inherit", color: "inherit" }} to={props.link}>{props.titulo}</Link></h1> */}
                {props.titulo}
            <div className="subtitleCoverImage">
                {/* <h1><Link style={{ textDecoration: "inherit", color: "inherit" }} to={props.link}>{props.titulo}</Link></h1> */}
                {props.subtitulo}
            </div></div>
        </div>
    );
}

export default CenteredImage;