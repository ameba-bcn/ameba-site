import React from "react";
import ReactPlayer from "react-player";
import MediaLinks from "../../layout/MediaLinks";
import TitleSection from "../TitleSection";
import styled from "styled-components";

export default function MediaSection(props) {
  const { mediaUrls = {}, bgColor } = props;

  const StyledMediaGral = styled.div`
    height: auto;
    width: 100%;
    background-color: ${(props) => (props.bgColor ? props.bgColor : "#f2c571")};
    padding: 80px 0px;
  `;

  return (
    <StyledMediaGral bgColor={bgColor}>
      <TitleSection title="Media" />
      <div className="media-artista">
        {mediaUrls.map((n) => (
          // <div className="mediaPlayer">
          <ReactPlayer url={n} />
          // </div>
        ))}
      </div>
      {/* <div className="xarxes-artista">
        <MediaLinks fcbk="#" insta="#" twit="#" yout="#" />
      </div> */}
    </StyledMediaGral>
  );
}
