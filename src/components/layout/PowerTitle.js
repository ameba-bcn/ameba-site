import React from 'react';
import './PowerTitle.css'
// const stylesTit = {
//     title: {
//         fontSize: 220,
//         fontFamily: 'Bebas Neue',
//         position: 'center',
//         fontWeight: 600,
//         textAlign: 'center',
//         textShadowColor:'#000',
//         textShadowOffset:{width: 5, height: 5},
//         textShadowRadius:10,
//     }
// };

function PowerTitle(props) {
    return (
        <div className="BGWrapper">
            <div className="PowerTitle" >{props.title} </div>
        </div>
    );
}

export default PowerTitle;