import React from 'react';
// import Button from '@material-ui/core/Button';

const stylesTit = {
    title: {
        fontSize: 200,
        fontFamily: 'Montserrat',
        position: 'center',
        fontWeight: 900,
        textAlign: 'center',
        textShadowColor:'#000',
        textShadowOffset:{width: 5, height: 5},
        textShadowRadius:10,
    }
};

function PowerTitle(props) {
    return (
        <div className="BGWrapper">
            <div style={stylesTit.title} className="PowerTitle" >{props.title} </div>
            {/* <Button variant="contained" color="secondary">Leer Mas</Button> */}
        </div>

    );
}

export default PowerTitle;