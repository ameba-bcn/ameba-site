import React, { useState, useEffect } from "react";

const QrLanding = (props) => {
  const [strToken, setStrToken] = useState("");
  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const parsed = queryString.parse(props.location.search);

  useEffect(() => {
    setStrToken(parsed["token"]);
  }, [parsed, strToken, setStrToken]);
  return <div></div>;
};

export default QrLanding;
