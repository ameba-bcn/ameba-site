import React from "react";
import { NavLink } from "react-router-dom";
import { ReactFitty } from "react-fitty";
import styled from "styled-components";
import { useMediaQuery } from "@material-ui/core";
import { MOBILE_SMALL } from "../../../utils/constants";
import { StyledCardLayout } from "./StyledCardLayout";
import PlusButton from "../../button/PlusButton";
import { createLastRowIterator, sortByProperty } from "../../../utils/utils";

export default function CardLayout(props) {
  const { cardList = [], urlRoot } = props; //Pendiente recibir si es entrevista por props

  const TitleStyled = styled.div`
    position: absolute;
    font-family: "Bebas Neue";
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #fae6c5;
    z-index: 999;
    padding: 20px;
    font-weight: 800;
    font-style: italic;
  `;
  const isOneColumn = useMediaQuery("(max-width:1290px)");
  const isMobile = useMediaQuery(MOBILE_SMALL);

  const cardGenerator =
    !!cardList.length &&
    sortByProperty(cardList, "created", false)?.map((data) => {
      console.log("data", data);
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
    <StyledCardLayout>
      {cardList.length > 0 && cardGenerator}
      {cardGenerator &&
        !isOneColumn &&
        createLastRowIterator(cardList, 627, 40).map((n, index) => (
          <i aria-hidden={true} key={index}></i>
        ))}
    </StyledCardLayout>
  );
}
