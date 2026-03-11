import React, { useState, useEffect } from "react";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import LettersMove from "../../components/layout/LettersMove";
import { AMEBA_EMAIL, BASE_URL, radioDublabLink } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import "../../styles/GlobalStyles.css";
import "./QrLanding.css";
import axiosInstance from "../../axios";

const QrLanding = (props) => {
  const [memberData, setMemberData] = useState({});

  const [t] = useTranslation("translation");
  const parsed = Object.fromEntries(new URLSearchParams(props.location.search));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const strToken = parsed["token"] || parsed["?token"];
    axiosInstance
      .get(BASE_URL + `member_card/?token=${strToken}`, {})
      .then((res) => {
        setMemberData(res?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [parsed]);

  return (
    <div className="logViewYellow">
      {loading ? (
        <Spinner height={400} color="black" />
      ) : (
        <div className="qr-landing">
          {memberData && Object.keys(memberData)?.length > 0 ? (
            <div className="json-formatted-box">
              <DisclaimerBox
                text={t("soci.carnet")}
                hideCloseIcon={true}
                bgColor={`var(--color-cream)`}
              />
              <div className="json-formatted">
                <pre>{JSON.stringify(memberData, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="single-msg">
              {t("errors.general")}
              <br />
              {t("errors.contacta")}
              <div className="styled-link">
                <a href="mailto:info@ameba.cat">{AMEBA_EMAIL}</a>
              </div>
            </div>
          )}
        </div>
      )}
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#FAE6C5"
      />
    </div>
  );
};

export default QrLanding;
