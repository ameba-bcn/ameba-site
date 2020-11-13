import React from 'react';

//Parallax
// import Parallax from 'react-rellax'

// Material UI
import Button from '@material-ui/core/Button';

// Ilustracion y texto
import AmebaLogo from '../_amebaLogo'

function AlphaBlock(props) {
    return (
        <div className="ContainerAmeba">
            <div className='left-side'>
                {/* <Parallax className="titulo" speed={10} wrapper={props.wrapper} > */}
                    <h1>{props.titulo}</h1>
                {/* </Parallax> */}
                {/* <Parallax className="subtitulo" speed={5} wrapper={props.wrapper}> */}
                    <h2>{props.subtitulo}</h2>
                {/* </Parallax> */}
                {/* <Parallax className="parrafo" speed={2} wrapper={props.wrapper}> */}
                    <p>{props.parrafo}</p>
                    <Button variant="contained" color="secondary">{props.button}</Button>
                {/* </Parallax> */}
            </div>
            <div className="right-side">
                {/* <Parallax speed={0} wrapper={props.wrapper}> */}
                    <AmebaLogo />
                {/* </Parallax> */}
            </div>
        </div>
    );
}

export default AlphaBlock;