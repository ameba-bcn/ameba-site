import React from "react";
import DOMPurify from "dompurify";
import TitleSection from "../../../components/layout/TitleSection";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LinkBox from "../../../components/link-box/LinkBox";
import { StyledMainColumnView } from "../../../styles/GlobalStyles.style";
import styled from "styled-components";

export const StyledPreviewerSociosDetailed = styled.div`
  min-height: 400px;
`;

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
    <StyledPreviewerSociosDetailed>
      <StyledMainColumnView>
        <div className="top-section_entr">
          <div className="ts-title">{project_name}</div>
        </div>
        <div className="bio-gral">
          <TitleSection title={`by ${first_name}`} />
          <div className="bio-section">
            <div
              className="bio-text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
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
      </StyledMainColumnView>
    </StyledPreviewerSociosDetailed>
  );
};

export default PreviewerSociosDetailed;
