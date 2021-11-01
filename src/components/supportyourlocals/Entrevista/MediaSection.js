import React from "react";
import ReactPlayer from "react-player";
import MediaLinks from "../../layout/MediaLinks";
import TitleSection from "../TitleSection";

export default function MediaSection(props) {
  const { artist = {} } = props;
  return (
    <div className="media-gral">
      <TitleSection title="Media" />
      {artist.media_urls && artist.media_urls.length > 0 ? (
        <div className="media-artista">
          {artist.media_urls.map((n) => (
            // <div className="mediaPlayer">
            <ReactPlayer url={n} />
            // </div>
          ))}
        </div>
      ) : null}
      <div className="xarxes-artista">
        <MediaLinks fcbk="#" insta="#" twit="#" yout="#" />
      </div>
    </div>
  );
}
