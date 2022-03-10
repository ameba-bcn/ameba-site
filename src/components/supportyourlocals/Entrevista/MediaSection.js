import React from "react";
import ReactPlayer from "react-player";
// import MediaLinks from "../../layout/MediaLinks";
import TitleSection from "../TitleSection";
import styled from "styled-components";

export default function MediaSection(props) {
  const { mediaUrls = {}, bgColor } = props;

  const StyledMediaGral = styled.div`
    height: auto;
    width: 100%;
    background-color: ${(props) => (props.bgColor ? props.bgColor : "#f2c571")};
    padding: 20px 0px 40px 0px;
  `;

  const StyledMediaLinks = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    div {
      position: relative;
      margin-top: 20px;
      a {
        width: 100%;
        font-size: 34px;
        font-family: "Bebas Neue";
        font-weight: 900;
        line-height: 1em;
        color: #212529;
        text-decoration: none;
        text-overflow: ellipsis;
        @media (max-width: 500px) {
          font-size: 24px;
        }
      }
      a:before {
        position: absolute;
        margin: 0 auto;
        top: 100%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000;
        content: "";
        opacity: 0.3;
        -webkit-transform: scaleX(0.9);
        transition-property: opacity, -webkit-transform;
        transition-duration: 0.3s;
      }
      a:hover:before {
        opacity: 1;
        -webkit-transform: scaleX(1);
      }
    }
  `;

  return (
    <StyledMediaGral bgColor={bgColor} className="media-gral">
      <TitleSection title="Media" />
      <StyledMediaLinks>
        {mediaUrls.map((n) => (
          <div className="mediaPlayer">
            <ReactPlayer url={n} height="100px" />
            {/* <div>
             <a href={n} rel="noreferrer" target="_blank">
               {n.split("www.").length > 1 ? n.split("www.")[1] : n}
             </a>
           </div> */}
          </div>
        ))}
      </StyledMediaLinks>
      {/* <div className="xarxes-artista">
        <MediaLinks fcbk="#" insta="#" twit="#" yout="#" />
      </div> */}
    </StyledMediaGral>
  );
}
