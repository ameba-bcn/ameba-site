import React, { useState } from "react";
import { useSelector } from "react-redux";
import PowerTitle from "../components/layout/PowerTitle";
import "../components/supportyourlocals/SupportYourLocals.css";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import CardLayout from "../components/layout/CardLayout/CardLayout";
import SearchBox from "../components/searchBox/SearchBox";

export default function SupportYourLocals() {
  const [t] = useTranslation("translation");

  const [searchInput, setSearchInput] = useState("");
  const { support } = useSelector((state) => state.data);
  const filteredArtists = support.filter(
    (artist) =>
      artist?.is_ameba_dj === false &&
      artist?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );

  return (
    <div className="SupportContent" id="SupportContent">
      <PowerTitle
        title={"#SUPPORTYOURLOCALS"}
        className="SupportTitle"
        subtitle={t("support.title.subtitle")}
      />
      <SearchBox
        searchText="Busca"
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        hidden={true}
      />
      <CardLayout cardList={filteredArtists} urlRoot="support" />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
