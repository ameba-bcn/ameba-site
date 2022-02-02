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

export default function Entrevista() {
  let history = useHistory();
  let location = useLocation();
  const { support } = useSelector((state) => state.data);
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
  const mediaUrls = !!support.length
    ? support.find((x) => x.id === parseInt(urlID))?.media_urls
    : [];
  const [artist, setArtist] = useState([
    {
      id: 0,
      name: "",
      images: [],
      biography: "",
      media_urls: [],
      tags: [],
    },
  ]);
  const tags = artist.tags || [];
  const { is_ameba_dj = false } = artist;
  const hasMediaSection = !!mediaUrls.length;
  const hasActivitiesSection = false;
  const hasInterviews = artist.has_interview;

  useEffect(() => {
    axiosInstance
      .get(`artists/${urlID}/`, {})
      .then((resp) => {
        setArtist(resp.data);
        const interviewId = resp.data.interview_id;
        axiosInstance.get(`interviews/${interviewId}/`, {}).then((res) => {
          setInterview(res.data);
        });
      })
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  }, [urlID]);

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
            color="#F2C571"
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
        color={"#FAE6C5"}
      />
    </div>
  );
}
