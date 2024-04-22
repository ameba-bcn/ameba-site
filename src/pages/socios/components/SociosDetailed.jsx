/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import axiosInstance from "../../../axios";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LettersMove from "../../../components/layout/LettersMove";
import { API_URL } from "../../../utils/constants";
import { StyledSociosMain } from "./StyledSociosDetailed";
import LinkBox from "../../../components/link-box/LinkBox";
import TitleSection from "../../../components/layout/TitleSection";
import { StyledMainColumnView } from "../../../styles/GlobalStyles.style";
import Spinner from "../../../components/spinner/Spinner";

const SociosDetailed = () => {
  const history = useHistory();

  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  let urlID = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  const { member_projects = [] } = useSelector((state) => state.data);
  const [urlData] = member_projects.filter(
    (x) => x?.project_name?.replace(/\s+/g, "-")?.toLowerCase() === urlID
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

  if (loading) {
    return (
      <StyledSociosMain>
        <Spinner height={400} />{" "}
        <LettersMove
          sentence={"l'associació de música electrònica de barcelona"}
          color={"#F2C571"}
        />
      </StyledSociosMain>
    );
  }

  return (
    <StyledSociosMain>
      <StyledMainColumnView>
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
      </StyledMainColumnView>
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#F2C571"}
      />
    </StyledSociosMain>
  );
};

export default SociosDetailed;
