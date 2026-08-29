import React, { useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/gsapSetup';
import useGsapContext from '../../hooks/use-gsap-context';
import './DateTimeDisplay.css';

// §3.2 "Propera activitat" — only the digit that changes animates
// (yPercent reveal inside an overflow-hidden box), never the whole block.
const DateTimeDisplay = ({ value, type, isDanger }) => {
  const valueRef = useRef(null);

  useGsapContext(() => {
    if (prefersReducedMotion() || !valueRef.current) return;
    gsap.fromTo(valueRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
  }, [value], valueRef);

  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p className="countdown__value-mask">
        <span className="countdown__value" ref={valueRef}>
          {value}
        </span>
      </p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
