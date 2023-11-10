import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import PowerTitle from "../components/layout/PowerTitle";
import LettersMove from "../components/layout/LettersMove";
import SoundSystem from "../components/projects/SoundSystem";

export const StyledProjects = styled.div`
  height: auto;
  background-color: #fae6c5;
`;

const Projects = () => {
  const [t] = useTranslation("translation");
  return (
    <StyledProjects>
      <PowerTitle title={t("menu.projectes")} className="SupportTitle" />
      <SoundSystem />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </StyledProjects>
  );
};

export default Projects;
