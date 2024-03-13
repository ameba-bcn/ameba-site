import React, { useState, useEffect } from "react";
import "./ScrollTop.css";
import { useHistory } from "react-router-dom";
import Icon from "../ui/Icon";
import styled from "styled-components";

export const StyledScrollTop = styled.div`
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.54);
  padding: 12px;
  overflow: visible;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  cursor: pointer;
`;

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
  }, []);

  return (
    <div>
      {show && (
        <StyledScrollTop onClick={handleClick} className="scroll-to-top">
          <Icon icon="arrowUp" type="" strokeWidth={2} />
        </StyledScrollTop>
      )}
    </div>
  );
};

export default ScrollTop;
