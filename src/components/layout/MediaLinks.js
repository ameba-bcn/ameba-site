import React from "react";
import Icon from "../ui/Icon";

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
          <Icon icon="facebook" type="hoverable-cream" />
        </a>
      ) : null}
      {insta ? (
        <a
          href={`https://www.instagram.com/${insta}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon icon="instagram" type="hoverable-cream" />
        </a>
      ) : null}
      {twit ? (
        <a
          href={`https://twitter.com/${twit}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon icon="twitter" className="twitter" type="hoverable-cream" />
        </a>
      ) : null}
      {yout ? (
        <a
          href={`https://www.youtube.com/${yout}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon icon="youtube" type="hoverable-cream" />
        </a>
      ) : null}
    </div>
  );
}
