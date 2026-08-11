import React from "react";
import "./LinkBox.css";
import { iframesValidation } from "../../utils/validations";
import { sanitizeEmbed } from "../../utils/sanitize";
import Icon from "../ui/Icon";

const LinkBox = (props) => {
  const {
    label = "previsualització",
    editMode = false,
    thinLine = false,
    mediaLinks = [],
    setMediaLinks = () => {},
  } = props;

  return (
    <div style={{ marginTop: "-14px" }}>
      <div className="link-label-box">
        <div className="link-label">{label}</div>
      </div>
      <div className={thinLine ? "link-box link-box--thin" : "link-box"}>
        {mediaLinks.map((link) => {
          const safeEmbed = iframesValidation(link) ? sanitizeEmbed(link) : "";
          return safeEmbed ? (
            <div className="link-row" key={link}>
              {editMode ? (
                <div className="delete-link-icon">
                  <Icon
                    icon="trash"
                    type="hoverable-cream"
                    onClick={() =>
                      setMediaLinks(mediaLinks.filter((x) => x !== link))
                    }
                  />
                </div>
              ) : null}
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: safeEmbed }}
              />
            </div>
          ) : (
            <div className="link-row" key={link}>
              {editMode ? (
                <div className="delete-link-icon">
                  <Icon
                    icon="trash"
                    type="hoverable-cream"
                    onClick={() =>
                      setMediaLinks(mediaLinks.filter((x) => x !== link))
                    }
                  />
                </div>
              ) : null}
              <div className="content">
                {/^https?:\/\//i.test(link || "") ? (
                  <a href={link} rel="noreferrer" target="_blank">
                    {typeof link === "string" && link?.split("www.").length > 1
                      ? link?.split("www.")[1]
                      : link}
                  </a>
                ) : (
                  <span>{link}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinkBox;
