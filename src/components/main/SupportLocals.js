import React from 'react';
import MainSupportLocals from '../supportyourlocals/MainSupportLocals'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './SupportLocals.css';
import { useTranslation } from 'react-i18next';

export default function SupportLocals() {
    const breakpoint = useMediaQuery('(max-width:950px)');
    const [t] = useTranslation("translation");

    const [ref, inView] = useInView({
        threshold: '0.5',
    });
    
    return (
        <div className="Bloque" id="locals" ref={ref}>
            <MainSupportLocals className="gridNoticies" />
            {inView && breakpoint ? <div className="overlayMobile">
                <Link to="/support" style={{ textDecoration: 'inherit' }}>
                    <div className="overlayTitleMobile">
                        #SUPPORT<br />YOUR<br />LOCALS
                    </div>
                </Link>
            </div> :
                <div className="overlay">
                    <Link to="/support" style={{ textDecoration: 'inherit' }}>
                        <div className="overlayTitle">
                            #SUPPORTYOURLOCALS
                    </div>
                        <div className="overlaySubtitle">
                        {t("support.title.subtitle")}
                    </div>
                    </Link>
                </div>
            }
        </div>
    );
}