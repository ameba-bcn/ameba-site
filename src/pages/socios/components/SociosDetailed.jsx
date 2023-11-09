import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import ImageCarousel from "../../../components/images/ImageCarousel";
import LettersMove from "../../../components/layout/LettersMove";
import TitleSection from "../../../components/supportyourlocals/TitleSection";
import { API_URL } from "../../../utils/constants";
import { StyledSociosMain } from "./StyledSociosDetailed";

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
  const ID = urlData?.id;
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}artists/${ID}/`, {})
      .then((resp) => {
        setArtist(resp.data);
      })
      .catch((err) => {
        console.log("ERROR: anything else", err);
      });
  }, [ID]);

  return (
    <StyledSociosMain>
      <div className="top-section-gral">
        <div className="top-section_entr">
          <div className="ts-breadcrumbs">
            <span onClick={() => history.push("/")}>AMEBA</span> /{" "}
            <span onClick={() => history.goBack()}>#SOCI@S</span> /{" "}
            {artist.name}
          </div>
          <div className="ts-title">{artist.name}</div>
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
          <TitleSection title="BIO" />
          <div className="bio-section">
            <div className="bio-text">{artist.biography}</div>
            {artist.images && (
              <div className="bio-img">
                <ImageCarousel imgList={dummyList} />
              </div>
            )}
          </div>
        </div>
      </div>

      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#F2C571"}
      />
    </StyledSociosMain>
  );
};

export default SociosDetailed;
