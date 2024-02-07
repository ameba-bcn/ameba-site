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

const mockedLinks = [
  `<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1246209739&color=%23191a18&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/balearicensemble\" title=\"Balearic Ensemble\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">Balearic Ensemble</a> · <a href=\"https://soundcloud.com/balearicensemble/besso-live-at-macera-club-madrid-25-03-22-live-pa\" title=\"B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">B.E.S.S.O. Live at Macera Club Madrid 25-03-22 (Live + PA)</a></div>`,
  "https://www.hipercor.es/",
];

const SociosDetailed = () => {
  const history = useHistory();

  const dummyList = [
    "/media/image/article-totebag-modular-500x500.jpg",
    "/media/image/article-camiseta-ameba-vinil-469x469.png",
    "/media/image/article-camiseta-ameba-new-469x469.png",
  ];
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
          {/* Tags para el futuro */}
          {/* {project?.tags?.length > 0 && (
            <div className="ts-tags">
              {project?.tags.map((n) => (
                <div className="tags-e" key={n}>
                  {n}
                </div>
              ))}
            </div>
          )} */}
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
