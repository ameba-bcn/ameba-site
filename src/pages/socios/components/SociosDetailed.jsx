/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const dummyList = [
    "/media/images/article-totebag-modular-500x500.jpg",
    "/media/images/article-camiseta-ameba-vinil-469x469.png",
    "/media/images/article-camiseta-ameba-new-469x469.png",
  ];
  const [artist, setArtist] = useState({});
  let urlID = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  const data = useSelector((state) => state.data);
  const { support = [] } = data;
  const [urlData] = support.filter(
    (x) => x?.name?.replace(/\s+/g, "-")?.toLowerCase() === urlID
  );

  const obj = {
    member_name: "fulanita",
    name: "Dummy project",
    descrption:
      "Lorem fistrum ese que llega no te digo trigo por no llamarte Rodrigor a wan torpedo diodeno. Jarl te va a hasé pupitaa diodenoo está la cosa muy malar no te digo trigo por no llamarte Rodrigor pecador ese hombree fistro diodeno ese que llega. Ese que llega hasta luego Lucas caballo blanco caballo negroorl quietooor qué dise usteer hasta luego Lucas ese hombree tiene musho peligro me cago en tus muelas a peich.",
    images: dummyList,
    links: [],
  };

  const { name, descrption, images, member_name } = obj;
  const ID = urlData?.id;
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}artists/${ID}/`, {})
      .then((resp) => {
        setArtist(resp.data);
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
            <span onClick={() => history.goBack()}>#SOCI@S</span> /{" "}
            {member_name}
          </div>
          <div className="ts-title">{name}</div>
          {/* Tags para el futuro */}
          {artist?.tags?.length > 0 && (
            <div className="ts-tags">
              {artist?.tags.map((n) => (
                <div className="tags-e" key={n}>
                  {n}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bio-gral">
          <TitleSection title={`by ${member_name}`} />
          <div className="bio-section">
            <div className="bio-text">{descrption}</div>
            {artist.images && (
              <div className="bio-img">
                <ImageCarousel imgList={images} />
              </div>
            )}
          </div>
        </div>
        <LinkBox mediaLinks={mockedLinks} />
      </div>

      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#F2C571"}
      />
    </StyledSociosMain>
  );
};

export default SociosDetailed;
