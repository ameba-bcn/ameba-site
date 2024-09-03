import React from "react";
import { NavLink } from "react-router-dom";
import { ReactFitty } from "react-fitty";
import styled from "styled-components";
import { MOBILE_SMALL } from "../../../utils/constants";
import { StyledCardLayout } from "./StyledCardLayout";
import PlusButton from "../../button/PlusButton";
import { createLastRowIterator, sortByProperty } from "../../../utils/utils";
import useMediaQuery from "../../../hooks/use-media-query";
import Spinner from "../../spinner/Spinner";

const TitleStyled = styled.div`
  position: absolute;
  font-family: "Bebas Neue";
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #fae6c5;
  z-index: 999;
  margin: 20px;
  font-weight: 800;
  font-style: italic;
  @media screen and (max-width: 600px) {
    margin-left: -10px;
  }
`;

export default function CardLayout(props) {
  const { cardList = [], urlRoot, loading = false } = props; //Pendiente recibir si es entrevista por props

  const isOneColumn = useMediaQuery("(max-width:1290px)");
  const isMobile = useMediaQuery(MOBILE_SMALL);

  const cardGenerator =
    !!cardList.length &&
    sortByProperty(cardList, "created", false)?.map((data) => {
      const {
        id = 0,
        images = [],
        name = "",
        tags = [],
        image,
        project_name,
      } = data;
      const baseName = project_name ? project_name : name;
      const urlName = baseName.replace(/\s+/g, "-")?.toLowerCase();
      return (
        <div className="fullcard" key={id}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/${urlRoot}/${urlName}`,
              aboutProps: data,
            }}
          >
            <div className="cardSupport">
              <TitleStyled>
                <ReactFitty maxSize={200}>
                  {project_name ? project_name : name}
                </ReactFitty>
              </TitleStyled>
              <img
                src={image ? image : images[0]}
                alt={name}
                className="cardSupportImgTop"
              />
              <div className="cardSupportPlusBox">
                <PlusButton
                  plusStyle="plus--obscure"
                  plusSize={isMobile ? "plus--medium" : "plus--big"}
                />
              </div>
              {!!tags.length && <div className="cardTagBox">{tags[0]}</div>}
            </div>
          </NavLink>
        </div>
      );
    });

  return (
    <StyledCardLayout $emptyView={!cardList.length > 0}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {cardList.length > 0 && cardGenerator}
          {cardGenerator &&
            !isOneColumn &&
            createLastRowIterator(cardList, 627, 40).map((n, index) => (
              <i aria-hidden={true} key={index}></i>
            ))}
        </>
      )}
    </StyledCardLayout>
  );
}
