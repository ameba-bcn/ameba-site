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
  children,
}) {
  return (
    <div className={className}>
      <div className="page-layout__inner">
        <PowerTitle title={title} autoScale {...titleProps} />
        <div className="page-layout__content">
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
