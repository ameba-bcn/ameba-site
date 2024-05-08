import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import LettersMove from "../../components/layout/LettersMove";
import { AMEBA_EMAIL, BASE_URL, radioDublabLink } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import { StyledLink } from "../../styles/GlobalStyles";
import axiosInstance from "../../axios";

export const StyledQr = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  justify-content: center;
  .json-formatted-box {
    max-width: 480px;
    margin: 0 auto;
    padding: 60px 0px;
    width: 100%;
  }
  .json-formatted {
    font-family: Montserrat, sans-serif;
    font-size: 22px;
    text-align: start;
    word-wrap: break-word;
  }
  @media screen and (max-width: 600px) {
    .json-formatted {
      overflow: scroll;
      font-size: 16px;
    }
  }
`;

const QrLanding = (props) => {
  const [memberData, setMemberData] = useState({});

  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const [t] = useTranslation("translation");
  const parsed = queryString.parse(props.location.search);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const strToken = parsed["token"] || parsed["?token"];
    console.log("strToken", strToken);
    axiosInstance
      .get(BASE_URL + `member_card/?token=${strToken}`, {})
      .then((res) => {
        setMemberData(JSON.stringify(res.data)).catch(console.error("errors"));
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
        <StyledQr>
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
              <StyledLink>
                <a href="mailto:info@ameba.cat">{AMEBA_EMAIL}</a>
              </StyledLink>
            </div>
          )}
        </StyledQr>
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
