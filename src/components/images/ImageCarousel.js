import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from 'react-swipeable-views-utils';
import "./ImageCarousel.css";
import { isCORSInactive } from "../../utils/utils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ImageCarousel(props) {
  const { imgList = [] } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imgList.length;

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
                  className="image-carousel-img"
                  src={isCORSInactive() + step}
                  alt={index}
                />
              ) : null}
            </div>
          ))}
      </SwipeableViews>
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            />
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            />
          }
        />
      )}
    </div>
  );
}

export default ImageCarousel;
