import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import LettersMove from "../../components/layout/LettersMove";
import { AMEBA_EMAIL, BASE_URL, radioDublabLink } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import { StyledLink } from "../../styles/GlobalStyles";

export const StyledQr = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  justify-content: center;
`;

const QrLanding = (props) => {
  const [qrImage, setQrImage] = useState("");

  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const [t] = useTranslation("translation");
  const parsed = queryString.parse(props.location.search);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const strToken = parsed["token"] || parsed["?token"];
    console.log("strToken", strToken);

    const config = {
      headers: {
        Authorization: `Bearer ${strToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "es-ES",
      },
    };
    axios
      .get(BASE_URL + "member_card/", {}, config)
      .then((res) => {
        setQrImage(res.data).catch(console.error("errors"));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [parsed]);
  console.log("qrImage", qrImage);
  return (
    <div className="logViewYellow">
      {loading ? (
        <Spinner height={400} color="black" />
      ) : (
        <StyledQr>
          {qrImage?.length > 0 ? (
            <div>
              <DisclaimerBox
                text={t("soci.carnet")}
                hideCloseIcon={true}
                bgColor={`var(--color-cream)`}
              />
              {qrImage && <img src={qrImage} alt="qr" />}
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
