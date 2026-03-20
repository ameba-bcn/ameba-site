import React, { useEffect, useState } from "react";
import "./Manifesto.css";
import useDataStore from "../../../../stores/useDataStore";
import EmbeddedSpinner from "../../../../components/spinner/EmbeddedSpinner";

const Manifesto = () => {
  const { about = {}, isManifestoLoading } = useDataStore();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.pageYOffset % 2;
      if (value === 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, setScroll]);

  return (
    <div className="Bloque" id="manifesto">
      <div className="manifesto-box">
        <div className="manifesto-title">manifesto</div>
        {isManifestoLoading ? (
          <EmbeddedSpinner alone />
        ) : (
          <div className="manifesto-text">{about?.text}</div>
        )}
      </div>
    </div>
  );
};

export default Manifesto;
