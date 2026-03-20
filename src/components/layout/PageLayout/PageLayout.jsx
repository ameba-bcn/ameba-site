import React from "react";
import PowerTitle from "../PowerTitle";
import LettersMove from "../LettersMove";
import EmbeddedSpinner from "../../spinner/EmbeddedSpinner";
import "./PageLayout.css";

export default function PageLayout({
  className,
  title,
  titleProps,
  loading,
  banner,
  centered,
  children,
}) {
  const contentClass = `page-layout__content${centered ? " page-layout__content--centered" : ""}`;

  return (
    <div className={className}>
      <div className="page-layout__inner">
        {title && <PowerTitle title={title} autoScale {...titleProps} />}
        <div className={contentClass}>
          {loading ? (
            <div className="page-layout__loader">
              <EmbeddedSpinner />
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
