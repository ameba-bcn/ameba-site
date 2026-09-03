import React from "react";
import PowerTitle from "../PowerTitle";
import LettersMove from "../LettersMove";
import Spinner from "../../spinner/Spinner";
import PromoBar from "../../ui/PromoBar";
import "./PageLayout.css";

export default function PageLayout({
  className,
  title,
  titleProps,
  loading,
  banner,
  centered,
  children,
  section,
  promo,
  flushBottom,
}) {
  const contentClass = `page-layout__content${centered ? " page-layout__content--centered" : ""}`;
  const rootClass = [className, section && `page-layout--${section}`]
    .filter(Boolean)
    .join(" ");
  const innerClass = `page-layout__inner${flushBottom ? " page-layout__inner--flush" : ""}`;

  return (
    <div className={rootClass}>
      {promo && <PromoBar />}
      <div className={innerClass}>
        {title && <PowerTitle title={title} {...titleProps} />}
        <div className={contentClass}>
          {loading ? (
            <div className="page-layout__loader">
              <Spinner size={64} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
      {banner && (
        <LettersMove
          sentence={banner.sentence}
          link={banner.link}
          color={banner.color}
        />
      )}
    </div>
  );
}
