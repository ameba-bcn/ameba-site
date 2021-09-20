import React from "react";
import LogComponent from "./../components/user/LogComponent";
import LettersMove from "./../components/layout/LettersMove";

export default function LogSession() {
  return (
    <div className="logView">
      <LogComponent />
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}
