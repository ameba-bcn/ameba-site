import React from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CountdownTimer from '../components/countdown/CountdownTimer';
import { closeSiteUnavailable } from '../redux/actions/fullscreen';

const StyledBoxCounter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .countdown-texto{
        font-size: 30px;
        font-family: "Bebas Neue";
    font-weight: 500;
    text-transform: uppercase;
    }
    .show-counter {
  padding: 0.5rem;
}
    .show-counter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 0.5rem;
  border: 1px solid #ebebeb;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #000;
}
.show-counter .countdown {
  line-height: 1.25rem;
  padding: 0 0.75rem 0 0.75rem;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.show-counter .countdown.danger {
  color: #ff0000;
}

.show-counter .countdown > p {
  margin: 0;
}

.show-counter .countdown > span {
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1rem;
}
}
`

const SiteNotAvailable = () => {
    const dispatch = useDispatch();
    const releaseDate = Date.parse("Apr 3, 2022");

    return (
        <StyledBoxCounter>
            <div className="countdown-texto">
                Estem treballant en una nova <span onClick={() => dispatch(closeSiteUnavailable())}>web</span>, tornem en:
            </div>
            <CountdownTimer targetDate={releaseDate} />
        </StyledBoxCounter>
    );
};

export default SiteNotAvailable;