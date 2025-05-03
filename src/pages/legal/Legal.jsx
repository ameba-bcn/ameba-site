import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { radioDublabLink } from "../../utils/constants";
import LettersMove from "../../components/layout/LettersMove";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import dataService from "../../store/services/data.service";
import { TitleInnerSection } from "../../styles/GlobalStyles.style";
import { StyledHeightBlock } from "../../styles/GlobalStyles";
import Icon from "../../components/ui/Icon";

export const StyledLegal = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  font-size: 24px;
  font-family: "Bebas Neue";
  .file-description-wrapper {
    position: relative;
    span {
      margin-left: 12px;
    }
  }
  #file-description {
    display: none;
    font-family: "Montserrat", sans-serif;
    position: absolute;
    min-width: 400px;
  }
  ul {
    list-style-type: square;
    text-align: left;
  }
  li:hover {
    #file-description {
      display: flex;
    }
  }
  a {
    white-space: nowrap;
    margin-left: 10px;
  }

  li {
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
  }
  padding: 24px 26px 12px 26px;
`;

const Legal = () => {
  const [t] = useTranslation("translation");
  const [files, setFiles] = useState([]);
  useEffect(() => {
    dataService.getLegal().then((res) => {
      setFiles(res.data);
    });
  }, []);

  return (
    <div className="logViewYellow">
      <StyledHeightBlock />
      <TitleInnerSection>{t("legal.title")}</TitleInnerSection>
      <StyledLegal>
        <DisclaimerBox
          bgColor={`var(--color-cream)`}
          className="disclaimerBox"
          hideCloseIcon={true}
          text={t("legal.init-text")}
        />
        <ul>
          {files?.map((file) => (
            <li key={file.title}>
              <Icon icon="pdf-file" className="menuIcon__bars" />
              <a href={file.file} target="_blank" rel="noreferrer">
                {file.title}
              </a>
              <div className="file-description-wrapper">
                <span id="file-description">- {file.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </StyledLegal>
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#FAE6C5"
      />
    </div>
  );
};

export default Legal;
