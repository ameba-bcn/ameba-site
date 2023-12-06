import React, { useState } from "react";
import styled from "styled-components";
import {
  Input,
  InputLabel,
  InputLabelBox,
} from "../../../../components/forms/InputField/InputField.style";
import LinkBox from "../../../../components/link-box/LinkBox";

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

const mockedLinks = [
  `<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1246209739&color=%23191a18&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/balearicensemble\" title=\"Balearic Ensemble\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">Balearic Ensemble</a> · <a href=\"https://soundcloud.com/balearicensemble/besso-live-at-macera-club-madrid-25-03-22-live-pa\" title=\"B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)</a></div>`,
  "https://www.hipercor.es/",
];

const MediaLinksForm = (props) => {
  const { label = "" } = props;
  const [currentLink, setCurrentLink] = useState("");
  const [mediaLinks, setMediaLinks] = useState(mockedLinks);

  const handleAddLink = (e) => {
    setCurrentLink("");
    setMediaLinks([...mediaLinks, currentLink]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    return setCurrentLink(e.target.value);
  };

  return (
    <form>
      <>
        <InputLabelBox>
          <InputLabel>{label}</InputLabel>
        </InputLabelBox>

        <Input
          id="media"
          type="text"
          label="link"
          placeholder=""
          className=""
          onChange={handleChange}
          value={currentLink}
          slimLine={true}
          valid={true}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleAddLink(event);
            }
          }}
        />
        {currentLink.length > 0 && (
          <SyledLinkInput>
            <span className="send" onClick={handleAddLink}>
              envia
            </span>
          </SyledLinkInput>
        )}
      </>
      <div>
        <LinkBox
          mediaLinks={mediaLinks}
          setMediaLinks={setMediaLinks}
          editMode={true}
        />
      </div>
    </form>
  );
};

export default MediaLinksForm;
