import React from "react";
import { isCORSInactive } from "../../../utils/utils";
import TitleSection from "../TitleSection";

export default function MainSection(props) {
  const { interview = {}, artist = {} } = props;
  return (
    <div className="bio-gral">
      <TitleSection title="BIO" />
      <div className="bio-section">
        <div className="bio-highlights">
          <div className="bio-data">
            NOM/ <span>{interview.title}</span>
          </div>
          <div className="bio-data">
            CIUTAT/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            SEGELLS/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            PROJECTES/ <span>DUMMY TEXT</span>
          </div>
          <div className="bio-data">
            ARTISTES/ <span>DUMMY TEXT</span>
          </div>
        </div>
        <div className="bio-text">{artist.biography}</div>
        {artist.images && (
          <div className="bio-img">
            <img
              className="bio-img-src"
              src={isCORSInactive() + artist.images[0]}
              alt={artist.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
