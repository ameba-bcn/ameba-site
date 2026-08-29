import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsletterForm from "./NewsletterForm";
import { gsap, SplitText, prefersReducedMotion } from "../../../utils/gsapSetup";
import useGsapContext from "../../../hooks/use-gsap-context";

function NewsletterFormLayout() {
  const [t] = useTranslation("translation");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const successRef = useRef(null);

  // 6.2 — "NEWSLETTER" reveal by character.
  useGsapContext(() => {
    const title = titleRef.current;
    if (!title) return;

    if (prefersReducedMotion()) {
      gsap.set(title, { autoAlpha: 0 });
      gsap.to(title, {
        autoAlpha: 1,
        duration: 0.2,
        scrollTrigger: { trigger: title, start: "top 90%", once: true },
      });
      return;
    }

    const split = new SplitText(title, { type: "chars" });
    gsap.set(title, { overflow: "hidden" });
    gsap.set(split.chars, { yPercent: 100 });
    gsap.to(split.chars, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.035,
      ease: "expo.out",
      scrollTrigger: { trigger: title, start: "top 90%", once: true },
    });
  }, [], rootRef);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  useGsapContext(() => {
    if (!isSubmitted || !successRef.current) return;
    if (prefersReducedMotion()) {
      gsap.set(successRef.current, { autoAlpha: 1 });
      return;
    }
    const check = successRef.current.querySelector(".newsletter-form__check");
    const message = successRef.current.querySelector(".newsletter-form__success-text");
    gsap
      .timeline()
      .fromTo(check, { scale: 0 }, { scale: 1, duration: 0.4, ease: "expo.out" })
      .fromTo(message, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.15");
  }, [isSubmitted], rootRef);

  return (
    <div className="formNewsGlobal" ref={rootRef}>
      <div className="formLabelNews" ref={titleRef}>
        newsletter
      </div>
      {isSubmitted ? (
        <div className="newsletter-form__success" ref={successRef}>
          <span className="newsletter-form__check" aria-hidden="true">
            ✓
          </span>
          <span className="newsletter-form__success-text">{t("newsletter.success")}</span>
        </div>
      ) : (
        <NewsletterForm setIsSubmitted={handleSuccess} isSubmitted />
      )}
    </div>
  );
}

export default NewsletterFormLayout;
