import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import "./ScrollTop.css";
import { useHistory } from "react-router-dom";

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);
  let history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

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
  });

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className="scroll-to-top">
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};
export default ScrollTop;
