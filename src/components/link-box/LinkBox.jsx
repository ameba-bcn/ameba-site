import React from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { iframesValidation } from "../../utils/validations";

const StyledLinkBox = styled.div`
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  .link-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 6px 0px;
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 30px;
      font-family: "Bebas Neue";
      font-weight: 800;
      line-height: 1em;
      color: #212529;
      text-decoration: none;
      text-overflow: ellipsis;
      @media (max-width: 500px) {
        font-size: 24px;
      }
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

export const StyledLinkLabelBox = styled.div`
  text-align: left;
  margin: 0px 0px -14px 13px !important;
`;

export const StyledLinkLabel = styled.div`
  display: inline-block;
  position: relative;
  background-color: #fae6c5;
  width: fit-content;
  color: #1d1d1b;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 20px;
  z-index: 10000;
  line-height: 0.8;
  padding: 0px 4px !important;
`;

const LinkBox = (props) => {
  const { editMode = false, mediaLinks = [], setMediaLinks = () => {} } = props;
  return (
    <div style={{ marginTop: "-14px" }}>
      <StyledLinkLabelBox>
        <StyledLinkLabel>previsualització</StyledLinkLabel>
      </StyledLinkLabelBox>
      <StyledLinkBox>
        {mediaLinks.map((link, index) =>
          iframesValidation(link) ? (
            <div className="link-row" key={link}>
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
            <div className="link-row" key={link}>
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
                  {link?.split("www.").length > 1
                    ? link?.split("www.")[1]
                    : link}
                </a>
              </div>
            </div>
          )
        )}
      </StyledLinkBox>
    </div>
  );
};

export default LinkBox;
