import React, { useEffect } from 'react';
import MainSupportLocals from '../supportyourlocals/MainSupportLocals'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import './SupportLocals.css';

const useViewportOut = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { width };
}

export default function SupportLocals() {
    const { width } = useViewportOut();
    const breakpoint = 950;

    const [ref, inView] = useInView({
        // triggerOnce: true,
        threshold: '0.5',
    });
    // useEffect(() => {
    //     if (inView) {
    //         // Fire a tracking event to your tracking service of choice.
    //         console.log("in view!!!!",inView)
    //         console.log("in width!!!!",width)
    //     }
    // }, [inView, width]);
    return (

        <div className="Bloque" id="locals" ref={ref}>
            <MainSupportLocals className="gridNoticies" />
             {inView && width < breakpoint ? <div className="overlayMobile">
                <Link to="/support" style={{ textDecoration: 'inherit' }}>
                    <div className="overlayTitleMobile">
                        #SUPPORT<br />YOUR<br />LOCALS
                    </div>
                </Link>
            </div> :
                <div className="overlay">
                    <Link to="/support" style={{ textDecoration: 'inherit' }}>
                        <div className="overlayTitle">
                            #SUPPORT YOUR LOCALS
                    </div>
                        <div className="overlaySubtitle">
                            conèix als artistes que donen vida a l'escena de la ciutat
                    </div>
                    </Link>
                </div>
            }


        </div>
    );
}