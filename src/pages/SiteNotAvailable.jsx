import React from 'react';
import './SiteNotAvailable.css';
import CountdownTimer from '../components/countdown/CountdownTimer';
import useUIStore from '../stores/useUIStore';

const SiteNotAvailable = () => {
    const closeSiteUnavailable = useUIStore((state) => state.closeSiteUnavailable);
    const releaseDate = Date.parse("Apr 3, 2022");

    return (
        <div className="site-not-available">
            <div className="countdown-texto">
                Estem treballant en una nova <span onClick={() => closeSiteUnavailable()}>web</span>, tornem en:
            </div>
            <CountdownTimer targetDate={releaseDate} />
        </div>
    );
};

export default SiteNotAvailable;
