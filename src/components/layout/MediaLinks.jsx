import React from "react";
import Icon from "../ui/Icon";

const LINKS = [
  { key: "insta", url: "https://www.instagram.com/", icon: "instagram" },
  { key: "soundcloud", url: "https://soundcloud.com/", icon: "soundcloud" },
  { key: "fcbk", url: "https://www.facebook.com/", icon: "facebook" },
  { key: "yout", url: "https://www.youtube.com/", icon: "youtube" },
  { key: "twit", url: "https://twitter.com/", icon: "twitter" },
];

export default function MediaLinks(props) {
  return (
    <div className="iconsFooter">
      {LINKS.map(({ key, url, icon }) =>
        props[key] ? (
          <a
            key={key}
            href={`${url}${props[key]}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={icon} />
          </a>
        ) : null,
      )}
    </div>
  );
}
