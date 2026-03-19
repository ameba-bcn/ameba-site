import React, { useState } from "react";
import PowerTitle, {
  StyledPowerTitleBox,
} from "../../components/layout/PowerTitle";
import LettersMove from "../../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import { radioDublabLink } from "../../utils/constants";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import SearchBox from "../../components/searchBox/SearchBox";
import useDataStore from "../../stores/useDataStore";

export default function SupportYourLocals() {
  const [t] = useTranslation("translation");
  const { support, isArtistLoading } = useDataStore();

  const [searchInput, setSearchInput] = useState("");
  const filteredArtists = support.filter(
    (artist) =>
      artist?.is_ameba_dj === false &&
      artist?.name?.toLowerCase()?.includes(searchInput?.toLowerCase()),
  );

  return (
    <StyledPowerTitleBox id="SupportContent">
      <PowerTitle
        title={"#SUPPORTYOURLOCALS"}
        className="SupportTitle"
        subtitle={t("support.title.subtitle")}
        autoScale
      />
      <SearchBox
        searchText="Busca"
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        hidden={true}
      />
      <CardLayout
        cardList={filteredArtists}
        urlRoot="support"
        loading={isArtistLoading}
      />
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#FAE6C5"
      />
    </StyledPowerTitleBox>
  );
}
