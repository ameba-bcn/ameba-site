import React from "react";
import { sanitizeHTML } from "../../../utils/sanitize";
import TitleSection from "../../../components/layout/TitleSection";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LinkBox from "../../../components/link-box/LinkBox";

const PreviewerSociosDetailed = (props) => {
  const {
    project_name = "",
    description = "",
    images = [],
    media_urls = "",
    first_name = "",
  } = props;
  const processedImages = images.map((img) => img.image);

  return (
    <div style={{ minHeight: "400px" }}>
      <div className="styled-main-column-view">
        <div className="top-section_entr">
          <div className="ts-title">{project_name}</div>
        </div>
        <div className="bio-gral">
          <TitleSection title={`by ${first_name}`} />
          <div className="bio-section">
            <div
              className="bio-text"
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(description),
              }}
            />
            {images?.length > 0 && (
              <div className="bio-img">
                <ImageCarousel imgList={processedImages} />
              </div>
            )}
          </div>
        </div>
        {media_urls?.length > 0 && (
          <div className="link-section">
            <LinkBox mediaLinks={media_urls} label="links" thinLine={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewerSociosDetailed;
