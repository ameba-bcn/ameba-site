import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./LlistatEntrevistes.css";
// import ScrollTop from "./../../components/layout/ScrollTop";
import { isCORSInactive } from "../../utils/utils";
import PlusButton from "../button/PlusButton";

export default function LlistatEntrevistes() {
  const data = useSelector((state) => state.data);
  const { support = [] } = data;
  // const cardClicked = (id) => {
  //   return <Redirect to={`/support/entrevista?='${id}`} />;
  // };

  const cardGenerator =
    support.length > 0
      ? support.map((data) => {
          return (
            <div
              className="fullcard"
              key={data.id}
              // onClick={() => cardClicked(data.id)}
            >
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/support/" + data.id,
                  aboutProps: data,
                }}
              >
                <div className="cardSupport">
                  <img
                    src={isCORSInactive() + data.images[0]}
                    alt={data.name}
                    className="cardSupportImgTop"
                  />
                  <div className="cardSupportTitle">{data.name}</div>
                  <div className="cardSupportPlusBox">
                    <PlusButton
                      plusStyle="plus--obscure"
                      plusSize="plus--big"
                    />
                  </div>
                  <div className="cardTagBox">DJ</div>
                </div>
              </NavLink>
            </div>
          );
        })
      : null;

  return (
    <div className="cardSupportDeck">
      {/* <ScrollTop showBelow={250} /> */}
      {support.length > 0 && cardGenerator}
    </div>
  );
}
