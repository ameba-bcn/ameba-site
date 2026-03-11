import React, { useState, useEffect } from "react";
import "./ScrollTop.css";
import "./ScrollTop.inline.css";
import { useLocation } from "react-router-dom";
import Icon from "../ui/Icon";

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  }, []);

  return (
    <div>
      {show && (
        <div onClick={handleClick} className="scroll-top__button scroll-to-top">
          <Icon icon="arrowUp" type="" strokeWidth={2} />
        </div>
      )}
    </div>
  );
};

export default ScrollTop;
