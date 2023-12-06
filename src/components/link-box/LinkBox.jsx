import React, { useState } from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const StyledLinkBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  .link-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .delete-link-icon {
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 18px;
    svg {
      cursor: pointer;
    }
  }
`;

const embeddedMediaRegex =
  /<iframe[^\>]+src=["'](https?:\/\/[^"']+)["'][^\>]*>.*<\/iframe>/;

const LinkBox = (props) => {
  const { editMode = false, mediaLinks = [], setMediaLinks = () => {} } = props;
  console.log("mediaLinks", mediaLinks);
  return (
    <StyledLinkBox>
      {mediaLinks.map((link, index) =>
        link?.match(embeddedMediaRegex) ? (
          <div className="link-row">
            {editMode ? (
              <div className="delete-link-icon">
                <DeleteOutlineIcon
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
          <div className="link-row">
            {editMode ? (
              <div className="delete-link-icon">
                <DeleteOutlineIcon
                  onClick={() =>
                    setMediaLinks(mediaLinks.filter((x) => x !== link))
                  }
                />
              </div>
            ) : null}
            <div className="content">
              <a href={link} rel="noreferrer" target="_blank">
                {link?.split("www.").length > 1 ? link?.split("www.")[1] : link}
              </a>
            </div>
          </div>
        )
      )}
    </StyledLinkBox>
  );
};

export default LinkBox;
