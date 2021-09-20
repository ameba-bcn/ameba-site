import React from "react";
import LettersMove from "./../components/layout/LettersMove";
import MemberProfile from "../components/profile/MemberProfile";
import SubscriptionBox from "../components/profile/SubscriptionBox";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const { user_profile } = useSelector((state) => state.profile);

  const isMember = user_profile === "MEMBER";

  const { isLoggedIn = false } = auth;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <div className="logTitleSmall">Dades personals</div>
        <MemberProfile
          buttonDisabled={false}
          setButtonDisabled={setButtonDisabled}
        />
        {isMember && <SubscriptionBox date="" />}
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </>
  );
}
