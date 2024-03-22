import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
import stateService from "./../store/services/profile.services";
import LettersMove from "../components/layout/LettersMove";

export default function QrClient(props) {
  const [data, setData] = useState({});
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const parsed = queryString.parse(props.location.search);
  const [t] = useTranslation("translation");

  useEffect(() => {
    if (parsed["token"].length > 0) {
      stateService.getCarnet(parsed["token"])?.then((data) => {
        setData(data);
      });
    }
  }, [parsed]);

  return (
    <div className="logViewRed">
      <div className="cardForm">
        <div className="card-form">
          <div className="logTitle">data</div>
          {Object.keys(data).length > 0 ? (
            <>{JSON.parse(data)}</>
          ) : (
            <>{t("general.sense-resultats")}</>
          )}
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </div>
  );
}
