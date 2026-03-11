import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { radioDublabLink } from "../../utils/constants";
import LettersMove from "../../components/layout/LettersMove";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import dataService from "../../store/services/data.service";
import "../../styles/GlobalStyles.style.css";
import "../../styles/GlobalStyles.css";
import "./Legal.css";
import Icon from "../../components/ui/Icon";

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
      <div className="height-block" />
      <div className="title-inner-section">{t("legal.title")}</div>
      <div className="legal">
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
      </div>
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
