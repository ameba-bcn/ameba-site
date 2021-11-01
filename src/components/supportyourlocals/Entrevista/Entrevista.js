import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Entrevista.css";
import TitleSection from "../TitleSection";
import axiosInstance from "../../../axios";
import LettersMove from "../../layout/LettersMove";
import MediaSection from "./MediaSection";
import QuestionsSection from "./QuestionsSection";
import MainSection from "./MainSection";
import EntrevistaMenu from "./EntrevistaMenu";

export default function Entrevista() {
  let history = useHistory();
  let location = useLocation();
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

  const [artist, setArtist] = useState([
    {
      id: 0,
      name: "",
      images: [],
      biography: "",
      media_urls: [],
    },
  ]);
  const hasMediaSection = !!artist.media_urls?.length;

  useEffect(() => {
    axiosInstance
      .get(`interviews/${urlID}/`, {})
      .then((res) => {
        setInterview(res.data);
        axiosInstance.get(`artists/${urlID}/`, {}).then((res) => {
          setArtist(res.data);
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
          <div className="ts-title">{interview.title}</div>
          <div className="ts-breadcrumbs">
            <span onClick={() => history.push("/")}>AMEBA</span> /{" "}
            <span onClick={() => history.goBack()}>#SUPPORTYOURLOCALS</span> /{" "}
            {interview.title}
          </div>
          <div className="ts-tags">
            <div className="tags-e">dj</div>
            <div className="tags-e">productor</div>
            <div className="tags-e">manager</div>
            <div className="tags-e">mastering</div>
            <div className="tags-e">label</div>
          </div>
          <EntrevistaMenu hasMediaSection={hasMediaSection} />
        </div>
        <MainSection interview={interview} artist={artist} />
      </div>
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#FFED00"}
      />
      <QuestionsSection interview={interview} />
      {hasMediaSection && (
        <>
          <LettersMove
            sentence={"l'associació de música electrònica de barcelona"}
            color={"#F2C571"}
          />
          <MediaSection artist={artist} />
        </>
      )}
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#EB5E3E"}
      />
      <div className="activitats-gral">
        <TitleSection title="Activitats" />
      </div>
      <LettersMove
        sentence={"l'associació de música electrònica de barcelona"}
        color={"#FAE6C5"}
      />
    </div>
  );
}
