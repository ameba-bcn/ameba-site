import React, { useState } from "react";
import "../../../../components/forms/InputField/InputField.style.css";
import LinkBox from "../../../../components/link-box/LinkBox";
import {
  iframesValidation,
  urlValidation,
} from "../../../../utils/validations";
import "../../../../components/forms/Log.style.css";
import "./MediaLinksForm.style.css";
import Tooltip from "../../../../components/tooltip/Tooltip";
import Icon from "../../../../components/ui/Icon";

// const mockedLinks = [
//   `<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1246209739&color=%23191a18&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/balearicensemble\" title=\"Balearic Ensemble\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">Balearic Ensemble</a> · <a href=\"https://soundcloud.com/balearicensemble/besso-live-at-macera-club-madrid-25-03-22-live-pa\" title=\"B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)</a></div>`,
//   "https://www.hipercor.es/",
// ];

const MediaLinksForm = (props) => {
  const {
    label = "",
    mediaLinks,
    setMediaLinks,
    disabled = false,
    tooltip = "",
  } = props;
  const [currentLink, setCurrentLink] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAddLink = () => {
    if (error.length === 0 && currentLink.length !== 0) {
      setMediaLinks([...mediaLinks, currentLink]);
      setCurrentLink("");
      setError(null);
      setEditMode(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentLink(e.target.value);
    if (
      iframesValidation(e.target.value) ||
      urlValidation(e.target.value) ||
      e.target.value.length === 0
    ) {
      setError("");
    } else setError("El link no tiene el formato correcto");
  };

  const isValid = !(currentLink.length > 0 && error?.length !== 0);

  const textareaClassName = [
    "media-links__textarea",
    !isValid ? "media-links__textarea--invalid" : "",
    currentLink ? "media-links__textarea--has-value" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {editMode || disabled ? (
        <>
          <div className="input-field__label-box">
            {tooltip.length > 0 ? (
              <Tooltip tooltipContent={tooltip}>
                <div className="input-field__label" id="link-box">
                  {label}
                  <Icon icon="tooltip" />
                </div>{" "}
              </Tooltip>
            ) : (
              <div className="input-field__label" id="link-box">{label}</div>
            )}
          </div>

          <textarea
            id="media"
            type="text"
            label="link"
            placeholder=""
            className={textareaClassName}
            onChange={handleChange}
            value={currentLink}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleAddLink(event);
              }
            }}
            disabled={disabled}
          />
          {currentLink.length > 0 && error?.length === 0 && (
            <div className="media-links__link-input">
              <span className="send" onClick={handleAddLink}>
                add
              </span>
            </div>
          )}
          {currentLink.length > 0 && error?.length !== 0 && (
            <div className="log-form-error">{error}</div>
          )}
        </>
      ) : (
        <>
          <div className="input-field__label-box">
            <div className="input-field__label" id="link-box">{label}</div>
          </div>
          <div className="media-links__add-link" onClick={() => setEditMode(true)}>
            ++ add link ++
          </div>
        </>
      )}
      {mediaLinks.length > 0 && (
        <div>
          <LinkBox
            mediaLinks={mediaLinks}
            setMediaLinks={setMediaLinks}
            editMode={true}
          />
        </div>
      )}
    </>
  );
};

export default MediaLinksForm;
