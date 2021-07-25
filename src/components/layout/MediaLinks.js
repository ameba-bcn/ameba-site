import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import React from "react";

export default function MediaLinks(props) {
  const { fcbk, insta, twit, yout } = props;
  return (
    <div className="iconsFooter">
      {fcbk ? (
        <a
          href={`https://www.facebook.com/${fcbk}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookIcon />
        </a>
      ) : null}
      {insta ? (
        <a
          href={`https://www.instagram.com/${insta}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <InstagramIcon />
        </a>
      ) : null}
      {twit ? (
        <a
          href={`https://twitter.com/${twit}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon />
        </a>
      ) : null}
      {yout ? (
        <a
          href={`https://www.youtube.com/${yout}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <YouTubeIcon />
        </a>
      ) : null}
    </div>
  );
}
