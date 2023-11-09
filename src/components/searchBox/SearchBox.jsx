import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyledIconSearchBox, StyledSearchBox } from "./SearchBox.style";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import useOutsideClick from "../../hooks/use-outside-click";

const SearchBox = ({
  searchInput,
  setSearchInput,
  searchText = "",
  hidden = false,
}) => {
  const [toggleHidden, setToggleHidden] = useState(true);
  const [t] = useTranslation("translation");

  const ref = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useOutsideClick(ref, () => {
    if (!toggleHidden) {
      setToggleHidden(true);
    }
  });

  if (hidden) {
    return (
      <StyledIconSearchBox>
        <div ref={ref}>
          {toggleHidden ? (
            <SearchOutlinedIcon
              onClick={() => setToggleHidden(!toggleHidden)}
            />
          ) : (
            <StyledSearchBox
              type="search"
              name="search"
              placeholder={`${t("general.cerca")}...`}
              onChange={handleChange}
              value={searchInput}
              autoFocus
            />
          )}
        </div>
      </StyledIconSearchBox>
    );
  }

  return (
    <StyledSearchBox
      type="search"
      placeholder={searchText}
      onChange={handleChange}
      value={searchInput}
    />
  );
};

export default React.memo(SearchBox);
