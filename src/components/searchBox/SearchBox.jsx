import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./SearchBox.style.css";
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
      <div className="search-box__icon">
        <div ref={ref}>
          {toggleHidden ? (
            <Icon
              icon="search"
              type="hoverable-cream"
              onClick={() => setToggleHidden(false)}
            />
          ) : (
            <input
              className="search-box__input"
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
      </div>
    );
  }

  return (
    <input
      className="search-box__input"
      type="search"
      placeholder={searchText}
      onChange={handleChange}
      value={searchInput}
      ref={ref}
      id="search-box-input"
    />
  );
};

export default React.memo(SearchBox);
