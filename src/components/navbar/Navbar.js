import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import { StyledNavbar } from "./StyledNavbar";
import { useMenuHandler } from "./use-menu-handler";
import Icon from "../ui/Icon";
import styled from "styled-components";

export const StyledMenuIcon = styled.div`
  font-size: 2rem;
  color: #fae6c5;
  text-align: end;
  cursor: pointer;
  margin-right: 8px;
  margin-top: 12px;
  svg {
    scale: 2;
  }
`;
export default function Navbar() {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [{ openMenu, closeMenu }, { isMenuOpen }] = useMenuHandler();

  return (
    <StyledNavbar>
      <div className="menuContainer">
        <div className="menuSuperior">
          <div className="menu-logo-box">
            <img
              // eslint-disable-next-line no-undef
              src={process.env.PUBLIC_URL + "/AmebaLogo.png"}
              className="menuAmebalogo"
              alt="Ameba Logo"
            />
            <NavLink to="/" data-item="AMEBA">
              AMEBA
            </NavLink>
          </div>
          {isMobile ? (
            <StyledMenuIcon>
              {isMenuOpen ? (
                <Icon
                  icon="clear"
                  className="menuIcon__cross"
                  onClick={closeMenu}
                  type="hoverable-dark"
                />
              ) : (
                <Icon
                  icon="menu"
                  className="menuIcon__bars"
                  onClick={openMenu}
                  type="hoverable-dark"
                />
              )}
            </StyledMenuIcon>
          ) : (
            <NavbarButtons isLoggedIn={isLoggedIn} handleClick={closeMenu} />
          )}
        </div>
        {isMobile && isMenuOpen && (
          <NavbarButtonsMobile
            isLoggedIn={isLoggedIn}
            handleClick={closeMenu}
          />
        )}
      </div>
    </StyledNavbar>
  );
}
