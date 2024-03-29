import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import { StyledHeightBlock } from "../../styles/GlobalStyles.style";
import SearchBox from "../../components/searchBox/SearchBox";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import { getMemberProjects } from "../../redux/actions/data";

export const StyledSocios = styled.div`
  height: auto;
  background-color: #fae6c5;
`;

const Socios = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberProjects());
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [t] = useTranslation("translation");
  const { member_projects } = useSelector((state) => state.data);

  return (
    <StyledSocios>
      <PowerTitle title="soci@s" className="SupportTitle" />
      <DisclaimerBox
        text={
          member_projects.length === 0
            ? t("general.sense-resultats")
            : t("soci.missatge-ppal")
        }
        id="project-disclaimer"
        borderColor="black"
      />
      <StyledHeightBlock />
      <SearchBox
        searchText="Busca"
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        hidden={true}
      />
      <CardLayout cardList={member_projects} urlRoot="socis" />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </StyledSocios>
  );
};

export default Socios;
