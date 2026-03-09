import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import { AMEBA_EMAIL } from "../../utils/constants";
import { StyledLink } from "../../styles/GlobalStyles";
import useProfileStore from "../../stores/useProfileStore";

export default function SubscriptionFinished(props) {
  const subscribeNewsletter = useProfileStore((state) => state.subscribeNewsletter);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [t] = useTranslation("translation");

  const parsed = Object.fromEntries(new URLSearchParams(props.location.search));
  let email = parsed["email"]?.trim() || parsed["?email"]?.trim();
  // Un email con un '+' lo recupera como espaciado, hay que reconstruirlo
  if (email && email.indexOf(" ") > 0) email = email.replace(" ", "+");

  useEffect(() => {
    if (email && email.length > 0)
      subscribeNewsletter(email).then(setIsSubmitted(true));
  }, [email, subscribeNewsletter]);

  return (
    <>
      <div className="full-height-msg">
        {!isSubmitted ? (
          <div className="single-msg">
            {t("errors.general")}
            <br />
            {t("errors.contacta")}
            <StyledLink>
              <a href="mailto:info@ameba.cat">{AMEBA_EMAIL}</a>
            </StyledLink>
          </div>
        ) : (
          <div className="single-msg">{t("general.agraiment")}</div>
        )}
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </>
  );
}
