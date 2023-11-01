import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import { StyledHeightBlock } from "../../styles/GlobalStyles.style";
import { StyledSectionDescription } from "../../styles/StyledSections";

export const StyledSocios = styled.div`
  height: auto;
  background-color: #fae6c5;
`;

const Socios = () => {
  const [t] = useTranslation("translation");
  const { support } = useSelector((state) => state.data);
  console.log(support);
  return (
    <StyledSocios>
      <PowerTitle title="soci@s" className="SupportTitle" />
      <StyledSectionDescription>
        Lorem fistrum por la gloria de mi madre tiene musho peligro se calle
        ustée. Quietooor ese pedazo de quietooor fistro apetecan pecador te voy
        a borrar el cerito tiene musho peligro tiene musho peligro me cago en
        tus muelas. Va usté muy cargadoo está la cosa muy malar se calle ustée
        está la cosa muy malar diodenoo pupita caballo blanco caballo negroorl.
      </StyledSectionDescription>
      <StyledHeightBlock />
      <CardLayout cardList={support} urlRoot="socis" />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </StyledSocios>
  );
};

export default Socios;
