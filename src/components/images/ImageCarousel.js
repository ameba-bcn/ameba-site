import React, { useState } from "react";
// import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
// import { autoPlay } from 'react-swipeable-views-utils';
import "./ImageCarousel.css";
import { MOBILE_NORMAL } from "../../utils/constants";
import useMediaQuery from "../../hooks/use-media-query";
import StepperUI from "./StepperUI";
import { SwipeableViews } from "../swipeable-views/SwipeableViews";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const StyledImgButtons = styled.div`
  position: relative;
  button,
  .arrow-img {
    position: relative;
    top: -250px;
    padding: 20px 10px;
    border-radius: 20px;
  }
  .arrow-empty {
    width: 44px;
  }
  .arrow-img:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

function ImageCarousel(props) {
  const { imgList = [] } = props;
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = imgList.length;
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="image-carousel-root">
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imgList &&
          imgList.map((step, index) => (
            <div key={index} className="image-carousel-div">
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  alt={index}
                  className="image-carousel-img"
                  src={step}
                  style={loaded ? {} : { display: "none" }}
                  onLoad={() => setLoaded(true)}
                  draggable={false}
                />
              ) : null}
            </div>
          ))}
      </SwipeableViews>
      {maxSteps > 1 && (
        <StyledImgButtons isMobile={isMobile}>
          <StepperUI
            steps={maxSteps}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </StyledImgButtons>
      )}
    </div>
  );
}

export default ImageCarousel;
