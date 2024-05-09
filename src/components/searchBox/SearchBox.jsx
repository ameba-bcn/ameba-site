import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyledIconSearchBox, StyledSearchBox } from "./SearchBox.style";
import useOutsideClick from "../../hooks/use-outside-click";
import Icon from "../ui/Icon";

const SearchBox = ({
  searchInput,
  setSearchInput,
  searchText = "",
  hidden = false,
}) => {
  const [toggleHidden, setToggleHidden] = useState(true);
  const [t] = useTranslation("translation");

  const ref = useRef("input-search-box");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const hideInputBox = () => {
    setToggleHidden(true);
  };

  useOutsideClick(ref, () => {
    if (toggleHidden) {
      hideInputBox();
    }
  });

  if (hidden) {
    return (
      <StyledIconSearchBox>
        <div ref={ref}>
          {toggleHidden ? (
            <Icon
              icon="search"
              type="hoverable-cream"
              onClick={() => setToggleHidden(false)}
            />
          ) : (
            <StyledSearchBox
              type="search"
              name="search"
              placeholder={`${t("general.cerca")}...`}
              onChange={handleChange}
              value={searchInput}
              onBlur={hideInputBox}
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
      ref={ref}
    />
  );
};

export default React.memo(SearchBox);
