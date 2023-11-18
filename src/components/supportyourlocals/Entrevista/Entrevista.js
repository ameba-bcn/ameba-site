import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import TitleSection from "../TitleSection";
import axiosInstance from "../../../axios";
import LettersMove from "../../layout/LettersMove";
import MediaSection from "./MediaSection";
import QuestionsSection from "./QuestionsSection";
import MainSection from "./MainSection";
import EntrevistaMenu from "./EntrevistaMenu";
import "./Entrevista.css";
import { API_URL } from "../../../utils/constants";

export default function Entrevista() {
  let history = useHistory();
  let location = useLocation();
  // const { support } = useSelector((state) => state.data);
  let urlID = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  const [interview, setInterview] = useState([
    {
      id: 0,
      title: "",
      image: "",
      introduction: "",
      created: "",
      current_answers: [{ answer: "", question: "" }],
    },
  ]);
  const data = useSelector((state) => state.data);
  const { support = [] } = data;
  const [urlData] = support.filter(
    (x) => x?.name?.replace(/\s+/g, "-")?.toLowerCase() === urlID
  );
  const ID = urlData?.id;
  // const mediaUrls = !!support.length
  //   ? support.find((x) => x.id === parseInt(urlID))?.media_urls
  //   : [];
  const [artist, setArtist] = useState({
    id: 0,
    name: "",
    images: [],
    biography: "",
    media: [],
    tags: [],
    created: "",
  });

  const {
    tags = [],
    media: mediaUrls = [],
    has_interview: hasInterviews,
  } = artist;
  const { is_ameba_dj = false } = artist;
  const hasMediaSection = !!mediaUrls.length;
  const hasActivitiesSection = false;

  useEffect(() => {
    axiosInstance
      .get(`${API_URL}artists/${ID}/`, {})
      .then((resp) => {
        setArtist(resp.data);
        const interviewId = resp.data.interview_id;
        axiosInstance
          .get(`${API_URL}interviews/${interviewId}/`, {})
          .then((res) => {
            setInterview(res.data);
          });
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "ERROR: client received an error response (5xx, 4xx)",
            err.response
          );
        } else if (err.request) {
          console.log(
            "ERROR: client never received a response, or request never left",
            err.response
          );
        } else {
          console.log("ERROR: anything else", err);
        }
      });
  }, [ID]);

  return (
    <div className="top-section">
      <div className="top-section-gral">
        <div className="top-section_entr">
          <div className="ts-breadcrumbs">
            <span onClick={() => history.push("/")}>AMEBA</span> /{" "}
            <span onClick={() => history.goBack()}>
              {is_ameba_dj ? "BOOKING" : "#SUPPORTYOURLOCALS"}
            </span>{" "}
            / {artist.name}
          </div>
          <div className="ts-title">{artist.name}</div>
          {/* Tags para el futuro */}
          {tags.length > 0 && (
            <div className="ts-tags">
              {tags.map((n) => (
                <div className="tags-e" key={n}>
                  {n}
                </div>
              ))}
            </div>
          )}
          <EntrevistaMenu
            hasMediaSection={hasMediaSection}
            hasActivitiesSection={hasActivitiesSection}
            hasInterviews={hasInterviews}
          />
        </div>
        <MainSection artist={artist} />
      </div>
      {hasInterviews && (
        <>
          <LettersMove
            sentence={"l'associació de música electrònica de barcelona"}
            color={"#FFED00"}
          />
          <QuestionsSection interview={interview} />
        </>
      )}
      {hasMediaSection && (
        <>
          <LettersMove
            sentence={"l'associació de música electrònica de barcelona"}
            color={!hasActivitiesSection ? "#EB5E3E" : "#F2C571"}
          />
          <MediaSection
            mediaUrls={mediaUrls}
            bgColor={!hasActivitiesSection ? "#EB5E3E" : "#F2C571"}
          />
        </>
      )}
      {hasActivitiesSection && (
        <>
          <LettersMove
            sentence={"l'associació de música electrònica de barcelona"}
            color={"#EB5E3E"}
          />
          <div className="activitats-gral">
            <TitleSection title="Activitats" />
          </div>
        </>
      )}
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#F2C571"}
      />
    </div>
  );
}
