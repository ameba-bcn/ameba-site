import React, { useState, useRef } from "react";
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
      <StyledIconSearchBox ref={ref}>
        {toggleHidden ? (
          <SearchOutlinedIcon onClick={() => setToggleHidden(!toggleHidden)} />
        ) : (
          <StyledSearchBox
            type="search"
            placeholder={searchText}
            onChange={handleChange}
            value={searchInput}
          />
        )}
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
