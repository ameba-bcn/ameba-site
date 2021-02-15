import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './Entrevista.css'
import TitleSection from './TitleSection';
import axiosInstance from "../../axios";
import state from './response2.js';
import LettersMove from './../layout/LettersMove';

export default function Entrevista(props) {
    let history = useHistory();
    let location = useLocation();
    let urlID = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);

    // const [state, setState] = useState([
    //     {
    //         id: 0,
    //         title: "",
    //         image: "",
    //         introduction: "",
    //         created: "",
    //         current_answers: [{ 'answer': "", "question": "" }]
    //     }
    // ]);
    // useEffect(() => {
    //     axiosInstance.get(`interviews/${urlID}/`, {})
    //         .then((res) => {
    //             console.log(res.data);
    //             setState(res.data)
    //         })
    //         .catch(error => {
    //             console.log("ERROL", error.response)
    //         });
    // }, []);

    return (
        <>
            <div className="top-section-gral">
                <div className="top-section_entr">
                    <div className="ts-title">{state.title}</div>
                    <div className="ts-breadcrumbs">
                        <span onClick={() => history.push('/')}>AMEBA</span> / <span onClick={() => history.goBack()}>#SUPPORTYOURLOCALS</span> / {state.title}
                    </div>
                    <div className="ts-tags"></div>
                </div>
                <TitleSection title="BIO" />
                <div className="bio-section">
                    <div className="bio-highlights">
                        <div className="bio-data">NOM/ <span>{state.title}</span></div>
                        <div className="bio-data">CIUTAT/ <span></span></div>
                        <div className="bio-data">SEGELLS/ <span></span></div>
                        <div className="bio-data">PROJECTES/ <span></span></div>
                        <div className="bio-data">ARTISTES/ <span></span></div>
                    </div>
                    <div className="bio-text">
                        {state.introduction}</div>
                    <div className="bio-img">
                        <img className="bio-img-src" src={state.image} alt={state.title} />
                    </div>
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#FFED00"} />
            <div className="entrevista-gral">
                <TitleSection title="Entrevista" />
                <div className="entrevista-columnes">
                    <div className="col1-preguntes">
                        {state.current_answers.map((f) => (
                            <div className="pregunta" id={f.id}>{f.questions}<span className="plus-symbol">+</span></div>
                        ))}
                    </div>
                    <div className="col2-preguntes">
                        {state.current_answers.map((f) => (
                            <div className="pregunta" id={`1-${f.id}`}>{f.questions}</div>
                        ))}
                    </div>
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#F2C571"} />
            <div className="media-gral">
                <TitleSection title="Media" />
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#EB5E3E"} />
            <div className="activitats-gral">
                <TitleSection title="Activitats" />
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#FAE6C5"} />


        </>
    )
}

