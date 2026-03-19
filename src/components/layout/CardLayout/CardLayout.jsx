import React from "react";
import { NavLink } from "react-router-dom";
import { MOBILE_SMALL } from "../../../utils/constants";
import "./CardLayout.css";
import AmebaCardTitle from "../../ui/AmebaCardTitle";
import PlusButton from "../../button/PlusButton";
import { createLastRowIterator, sortByProperty } from "../../../utils/utils";
import useMediaQuery from "../../../hooks/use-media-query";
import Spinner from "../../spinner/Spinner";

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

      const path = `/${urlRoot}/${encodeURIComponent(baseName)}`;
      return (
        <div className="fullcard" key={id}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: path,
              aboutProps: data,
            }}
          >
            <div className="cardSupport">
              <AmebaCardTitle
                autoGrow={true}
                className="cardSupportTitle"
                maxSize={400}
                overflow="inherit"
              >
                {project_name ? project_name : name}
              </AmebaCardTitle>
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
    <div
      className={`card-layout${!cardList.length > 0 ? " card-layout--empty" : ""}`}
    >
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
    </div>
  );
}
