import React from 'react';
import { Link } from 'react-router-dom'

//Parallax
// import Parallax from 'react-rellax'

// Material UI
import Button from '@material-ui/core/Button';

// Ilustracion y texto
import AmebaLogo from '../amebaLogo'

function BasicStructure(props) {
    return (
        <div className="Bloque" id="basic">
            <div className="ContainerAmeba">
                <div className='left-side'>
                    {/* <Parallax className="titulo" wrapper={props.wrapper}  speed={0}> */}
                    <div className="titulo">
                        <h1>{props.titulo}</h1>
                    </div>
                    {/* </Parallax> */}
                    {/* <Parallax className="subtitulo" wrapper={props.wrapper} speed={0}> */}
                    <div className="titulo">
                        <h2>{props.subtitulo}</h2>
                    </div>
                    {/* </Parallax> */}
                    {/* <Parallax className="contenido" wrapper={props.wrapper} speed={0}> */}
                    <div className="contenido"> <p>{props.contenido}</p>
                        <Button variant="contained" color="secondary"><Link style={{ textDecoration: "inherit", color: "inherit" }} to={props.link}> {props.buttonText} </Link></Button>
                    </div>
                    {/* </Parallax> */}
                </div>
                <div className="right-side">
                <AmebaLogo />
                    {/* <Parallax speed={0} wrapper={props.wrapper} ><AmebaLogo /></Parallax> */}
                </div>
            </div>
        </div >
    );
}

export default BasicStructure;