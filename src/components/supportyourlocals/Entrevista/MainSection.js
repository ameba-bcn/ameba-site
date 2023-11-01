import React from "react";
import TitleSection from "../TitleSection";

export default function MainSection(props) {
  const { artist = {} } = props;

  return (
    <div className="bio-gral">
      <TitleSection title="BIO" />
      <div className="bio-section">
        <div className="bio-text">{artist.biography}</div>
        {artist.images && (
          <div className="bio-img">
            <img
              className="bio-img-src"
              src={artist.images[0]}
              alt={artist.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
