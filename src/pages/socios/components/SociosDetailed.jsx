/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import axiosInstance from "../../../axios";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LettersMove from "../../../components/layout/LettersMove";
import TitleSection from "../../../components/supportyourlocals/TitleSection";
import { API_URL } from "../../../utils/constants";
import { StyledSociosMain } from "./StyledSociosDetailed";
import LinkBox from "../../../components/link-box/LinkBox";

const SociosDetailed = () => {
  const history = useHistory();

  const [project, setProject] = useState({});
  let urlID = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  const { member_projects = [] } = useSelector((state) => state.data);
  const [urlData] = member_projects.filter(
    (x) => x?.project_name?.replace(/\s+/g, "-")?.toLowerCase() === urlID
  );

  const { project_name, description, image, media_urls, first_name } = project;
  const ID = urlData?.id;
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}members/${ID}/`, {})
      .then((resp) => {
        setProject(resp.data);
      })
      .catch((err) => {
        console.warn("ERROR: something gone wrong", err);
      });
  }, [ID]);

  return (
    <StyledSociosMain>
      <div className="top-section-gral">
        <div className="top-section_entr">
          <div className="ts-breadcrumbs">
            <span onClick={() => history.push("/")}>AMEBA</span> /{" "}
            <span onClick={() => history.push("/socis")}>#SOCI@S</span> /{" "}
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
                __html: DOMPurify.sanitize(description),
              }}
            />
            {project.image && (
              <div className="bio-img">
                <ImageCarousel imgList={Array(image)} />
              </div>
            )}
          </div>
        </div>
        <div className="link-section">
          <LinkBox mediaLinks={media_urls} label="links" thinLine={true} />
        </div>
        <LettersMove
          sentence={"l'associació de música electrònica de barcelona"}
          color={"#F2C571"}
        />
      </div>
    </StyledSociosMain>
  );
};

export default SociosDetailed;
