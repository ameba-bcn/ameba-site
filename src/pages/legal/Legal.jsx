import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { radioDublabLink } from "../../utils/constants";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
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
    <PageLayout
      className="logViewYellow legal-page"
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-cream)",
      }}
    >
      <div className="legal-page__content">
        <div className="height-block" />
        <div className="legal-page__title">{t("legal.title")}</div>
        <div className="legal">
          <DisclaimerBox text={t("legal.init-text")} style="light" />
          <ul>
            {files?.map((file) => (
              <li key={file.title}>
                <Icon icon="pdf-file" />
                <div className="legal__file-info">
                  <a href={file.file} target="_blank" rel="noreferrer">
                    {file.title}
                  </a>
                  {file.description && (
                    <span className="legal__file-description">
                      {file.description}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Legal;
