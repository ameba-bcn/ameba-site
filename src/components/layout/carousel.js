import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../images/bannerTest2.png";
import img2 from "../../images/bannerTest3.png";
import img3 from "../../images/bannerTest1.png";

export default function MainCarousel() {

    return (
        <Carousel className="carouselFrame" infiniteLoop useKeyboardArrows autoPlay
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        transitionTime={500}
        >
            <div>
                <img className="carouselImg" alt="" src={img1} />
            </div>
            <div>
                <img className="carouselImg" alt="" src={img2} />
            </div>
            <div>
                <img className="carouselImg" alt="" src={img3} />
            </div>
        </Carousel>
    );

}