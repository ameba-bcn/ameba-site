import React from 'react';
import BasicStructure from '../components/layout/basicStructure';

function Botiga() {
    return (
        <div className="Bloque" id="shop">
            <BasicStructure 
                titulo='BOOOTIGA' 
                subtitulo='cosas guapas' 
                buttonText="Veure Mandanga" 
                link="/Botiga"
                contenido='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit est neque, vitae tincidunt justo vehicula sed. Praesent fermentum cursus tortor, nec convallis sem viverra vitae. Fusce sed scelerisque lectus, at faucibus lectus. Sed sed ipsum ut velit iaculis ullamcorper. Ut consectetur eros non mi dapibus, nec elementum quam porttitor. Ut eu nulla sit amet nibh vulputate bibendum ac porttitor ex. Phasellus interdum lacinia blandit. In ac risus odio. Mauris vitae ante urna. Maecenas bibendum nibh diam, et dictum arcu rutrum quis. Nunc a leo gravida, porta lacus vitae, rhoncus erat. Integer ornare augue quis felis mattis, sit amet cursus mauris faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer et auctor tortor, at mollis mauris.' 
            />
        </div>
    );
}

export default Botiga;