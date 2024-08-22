import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import { StyledNavbar } from "./StyledNavbar";
import Icon from "../ui/Icon";
import styled from "styled-components";
import useMediaQuery from "../../hooks/use-media-query";
import { setCloseMenu, setOpenMenu } from "../../store/actions/menu";

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
export default function Navbar({ isErrored = false }) {
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const ref = useRef("navbarButtonsMobileRef");

  const { isMenuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

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
          {isMobile
            ? !isErrored && (
                <StyledMenuIcon>
                  {isMenuOpen ? (
                    <Icon
                      icon="clear"
                      className="menuIcon__cross"
                      onClick={() => dispatch(setCloseMenu())}
                      type="hoverable-dark"
                    />
                  ) : (
                    <Icon
                      icon="menu"
                      className="menuIcon__bars"
                      onClick={() => dispatch(setOpenMenu())}
                      type="hoverable-dark"
                    />
                  )}
                </StyledMenuIcon>
              )
            : !isErrored && <NavbarButtons isLoggedIn={isLoggedIn} />}
        </div>
        {isMobile && isMenuOpen && (
          <NavbarButtonsMobile isLoggedIn={isLoggedIn} refer={ref} />
        )}
      </div>
    </StyledNavbar>
  );
}
