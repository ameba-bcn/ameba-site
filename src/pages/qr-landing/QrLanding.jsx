import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import LettersMove from "../../components/layout/LettersMove";
import { BASE_URL, radioDublabLink } from "../../utils/constants";

export const StyledQr = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  justify-content: center;
`;

const QrLanding = (props) => {
  let strToken = "";
  const [qrImage, setQrImage] = useState("");

  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const parsed = queryString.parse(props.location.search);

  useEffect(() => {
    strToken = parsed["token"] || parsed["?token"];

    const config = {
      headers: {
        Authorization: `Bearer ${strToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "es-ES",
      },
    };

    const bodyParameters = {
      key: "value",
    };
    axios
      .get(BASE_URL + "member_card/", bodyParameters, config)
      .then((res) => setQrImage(res.data).catch(console.error("errors")));
  }, [parsed, strToken]);

  return (
    <div className="logViewYellow">
      <StyledQr>
        <DisclaimerBox text={strToken} />
        {qrImage && <img src={qrImage} alt="qr" />}
      </StyledQr>
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
