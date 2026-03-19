import React from "react";
// import ReactPlayer from "react-player";
// import MediaLinks from "../../layout/MediaLinks";
import TitleSection from "../../../../components/layout/TitleSection";
import "./MediaSection.css";

export default function MediaSection(props) {
  const { mediaUrls = {}, bgColor } = props;

  const gralStyle = {
    backgroundColor: bgColor ? bgColor : "#f2c571",
  };

  return (
    <div className="media-section__gral media-gral" style={gralStyle}>
      <TitleSection title="Media" />
      <div className="media-section__links">
        {mediaUrls.map((n) => {
          return (
            <div className="media-section__player" key={n}>
              {/* <ReactPlayer url={n} height="100px" /> */}
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: `${n}` }}
              ></div>
              {/* <div>
             <a href={n} rel="noreferrer" target="_blank">
               {n.split("www.").length > 1 ? n.split("www.")[1] : n}
             </a>
           </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
