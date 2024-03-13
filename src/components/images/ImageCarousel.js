import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
// import { autoPlay } from 'react-swipeable-views-utils';
import "./ImageCarousel.css";
import { MOBILE_NORMAL } from "../../utils/constants";
import { useMediaQuery } from "@material-ui/core";
import Icon from "../ui/Icon";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const StyledImgButtons = styled.div`
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
  .MuiMobileStepper-dots {
    margin: 0 auto;
  }
  .MuiMobileStepper-root {
    height: 40px;
  }
`;

function ImageCarousel(props) {
  const { imgList = [] } = props;
  const theme = useTheme();
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
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
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
                />
              ) : null}
            </div>
          ))}
      </SwipeableViews>
      {maxSteps > 1 && (
        <StyledImgButtons isMobile={isMobile}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              activeStep === maxSteps - 1 || isMobile ? (
                <div className="arrow-empty"></div>
              ) : (
                <div className="arrow-img">
                  <Icon icon="arrowRight" onClick={handleNext} />
                </div>
              )
            }
            backButton={
              activeStep === 0 || isMobile ? (
                <div className="arrow-empty"></div>
              ) : (
                <div className="arrow-img">
                  <Icon icon="arrowLeft" onClick={handleBack} />
                </div>
              )
            }
          />
        </StyledImgButtons>
      )}
    </div>
  );
}

export default ImageCarousel;
