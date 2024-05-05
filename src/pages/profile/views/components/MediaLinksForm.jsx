import React, { useState } from "react";
import styled from "styled-components";
import {
  InputLabel,
  InputLabelBox,
} from "../../../../components/forms/InputField/InputField.style";
import LinkBox from "../../../../components/link-box/LinkBox";
import {
  iframesValidation,
  urlValidation,
} from "../../../../utils/validations";
import { LogFormError } from "../../../../components/forms/Log.style";

export const SyledLinkInput = styled.div`
  position: relative;
  .send {
    position: absolute;
    right: 10px;
    top: -33px;
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
`;

export const SyledAddLink = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 32px;
  height: 100%;
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  cursor: pointer;
  :hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const Textarea = styled.textarea`
  display: block;
  width: -webkit-fill-available;
  height: 100%;
  min-height: 40px;
  padding: 12px 12px;
  line-height: 1.5;
  line-break: anywhere;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  background-color: transparent;
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  padding-top: 14px;
  font-family: "Montserrat", sans-serif;
  color: #1d1d1b;
  font-size: 18px;
  font-weight: bold;
  overflow-y: hidden;
  ${(props) =>
    !props.valid
      ? `
  border-color: #EB5E3E;
  transition: border-bottom 0.2s, border-top 0.2s, border-right 0.2s,
    border-left 0.2s ease-in-out;`
      : `border-color: #1d1d1b;`}

  ${(props) =>
    props.value &&
    `  
    background-color: #fae6c5;
`}
${(props) =>
    props.slimLine &&
    props.slimLine === false &&
    `  
    border-width: 3px;
`}

  &::placeholder {
    text-transform: uppercase;
    padding-top: 2px;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 2rem;
  }
  &:focus {
    background-color: #fae6c5;
    border-color: #f2c571;
  }
  &:touch {
    background-color: #fae6c5;
  }

  &:disabled {
    border-top: solid transparent 4px !important;
    border-right: solid transparent 4px !important;
    border-left: solid transparent 4px !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fae6c5 inset !important;
  }
`;

// const mockedLinks = [
//   `<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1246209739&color=%23191a18&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/balearicensemble\" title=\"Balearic Ensemble\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">Balearic Ensemble</a> · <a href=\"https://soundcloud.com/balearicensemble/besso-live-at-macera-club-madrid-25-03-22-live-pa\" title=\"B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)</a></div>`,
//   "https://www.hipercor.es/",
// ];

const MediaLinksForm = (props) => {
  const { label = "", mediaLinks, setMediaLinks, disabled = false } = props;
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

  return (
    <>
      {editMode || disabled ? (
        <>
          <InputLabelBox>
            <InputLabel>{label}</InputLabel>
          </InputLabelBox>

          <Textarea
            id="media"
            type="text"
            label="link"
            placeholder=""
            className=""
            onChange={handleChange}
            value={currentLink}
            slimLine={true}
            valid={!(currentLink.length > 0 && error?.length !== 0)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleAddLink(event);
              }
            }}
            disabled={disabled}
          />
          {currentLink.length > 0 && error?.length === 0 && (
            <SyledLinkInput>
              <span className="send" onClick={handleAddLink}>
                add
              </span>
            </SyledLinkInput>
          )}
          {currentLink.length > 0 && error?.length !== 0 && (
            <LogFormError>{error}</LogFormError>
          )}
        </>
      ) : (
        <>
          <InputLabelBox>
            <InputLabel>{label}</InputLabel>
          </InputLabelBox>
          <SyledAddLink onClick={() => setEditMode(true)}>
            ++ add link ++
          </SyledAddLink>
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
