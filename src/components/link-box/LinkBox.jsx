import React from "react";
import "./LinkBox.css";
import { iframesValidation } from "../../utils/validations";
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
        {mediaLinks.map((link) =>
          iframesValidation(link) ? (
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
                dangerouslySetInnerHTML={{ __html: `${link}` }}
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
                <a href={link} rel="noreferrer" target="_blank">
                  {typeof link === "string" && link?.split("www.").length > 1
                    ? link?.split("www.")[1]
                    : link}
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LinkBox;
