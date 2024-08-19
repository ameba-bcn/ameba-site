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
import { getMemberProjects } from "../../store/actions/data";
import { ACTIVE_STATUS } from "../../utils/constants";

export const StyledSocios = styled.div`
  height: auto;
  background-color: #fae6c5;
  display: flex;
  flex-direction: column;
`;

const Socios = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberProjects());
  }, []);

  const { isMemberProjectsLoading } = useSelector((state) => state.loaders);
  const [searchInput, setSearchInput] = useState("");
  const [t] = useTranslation("translation");
  const { member_projects } = useSelector((state) => state.data);
  const { user_member_data = {} } = useSelector((state) => state.auth);
  const { status = "" } = user_member_data;

  const filteredSocios = member_projects.filter((project) =>
    project.project_name?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );

  return (
    <StyledSocios>
      <PowerTitle title="soci@s" className="SupportTitle" />
      {!isMemberProjectsLoading &&
        Object.keys(user_member_data).length > 0 &&
        status !== ACTIVE_STATUS && (
          <DisclaimerBox
            text={
              member_projects.length === 0
                ? t("general.sense-resultats")
                : t("soci.missatge-ppal")
            }
            id="project-disclaimer"
            borderColor="black"
          />
        )}
      <StyledHeightBlock />
      <SearchBox
        searchText="Busca"
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        hidden={true}
      />
      <CardLayout
        cardList={filteredSocios}
        urlRoot="socis"
        loading={isMemberProjectsLoading}
      />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </StyledSocios>
  );
};

export default Socios;
