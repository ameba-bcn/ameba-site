import React from "react";
import AmebaLogo from "../ui/logo/AmebaLogo";
import { AMEBA_EMAIL } from "../../utils/constants";
import "./AuthCard.css";
import "./AuthAside.css";

// Shared aside for the recovery and email-activation flows — same pitch
// shape (logo, title, text, numbered checklist, mailto help line), only
// the copy and the highlighted step change per flow.
export default function AuthAside({
  title,
  mobileTitle,
  text,
  steps,
  activeStep,
  helpTextPre,
  helpTextPost,
}) {
  return (
    <aside className="auth-card__aside">
      <AmebaLogo width={76} height={76} fill="var(--color-naranja)" />
      <h2 className="auth-card__aside-title auth-card__aside-title--desktop">
        {title}
      </h2>
      <h2 className="auth-card__aside-title auth-card__aside-title--mobile">
        {mobileTitle}
      </h2>
      <p className="auth-card__aside-text">{text}</p>

      <ol className="auth-steps">
        {steps.map((label, i) => {
          const n = i + 1;
          const state = n < activeStep ? "done" : n === activeStep ? "active" : "upcoming";
          return (
            <li key={label} className={`auth-steps__item auth-steps__item--${state}`}>
              <span className="auth-steps__num">{n}</span>
              {label}
            </li>
          );
        })}
      </ol>

      <p className="auth-card__aside-text auth-aside__help">
        {helpTextPre}{" "}
        <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>{" "}
        {helpTextPost}
      </p>
    </aside>
  );
}
