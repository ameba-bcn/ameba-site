/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sanitizeHTML } from "../../../utils/sanitize";
import axiosInstance from "../../../axios";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LettersMove from "../../../components/layout/LettersMove";
import { API_URL } from "../../../utils/constants";
import "./SociosDetailed.css";
import LinkBox from "../../../components/link-box/LinkBox";
import TitleSection from "../../../components/layout/TitleSection";
import useDataStore from "../../../stores/useDataStore";
import EmbeddedSpinner from "../../../components/spinner/EmbeddedSpinner";

const SociosDetailed = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  let urlID = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  const { member_projects = [] } = useDataStore();
  const [urlData] = member_projects.filter(
    (x) => x?.project_name === decodeURIComponent(urlID),
  );
  const { project_name, description, images, media_urls, first_name } = project;
  const ID = urlData?.id;

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}member_projects/${ID}/`, {})
      .then((resp) => {
        setProject(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.warn("ERROR: something gone wrong", err);
      });
  }, [ID]);

  return (
    <div className="socios-main">
      {loading ? (
        <EmbeddedSpinner alone />
      ) : (
        <div className="styled-main-column-view">
          <div className="top-section_entr">
            <div className="ts-breadcrumbs">
              <span onClick={() => navigate("/")}>AMEBA</span> /{" "}
              <span onClick={() => navigate("/socis")}>#SOCI@S</span> /{" "}
              {project_name}
            </div>
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
                  <ImageCarousel imgList={images} />
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
      )}
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"var(--color-naranja)"}
      />
    </div>
  );
};

export default SociosDetailed;
