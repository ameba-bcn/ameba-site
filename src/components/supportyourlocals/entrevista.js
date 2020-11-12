import React from 'react';
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import './Entrevista.css'


export default function Entrevista(props) {
    let history = useHistory();
    const EntrevistaResponse = props.location.aboutProps;
    let answers = EntrevistaResponse.interview.answers;
    let questions = EntrevistaResponse.interview.questions;

    return (
        <>
            <div className="fullEntrevista" >
                <div className="rowEntrevista">
                    <div className="columnImatge">
                        <img className="imgEntrevista" src={EntrevistaResponse.img} alt={EntrevistaResponse.title} />
                    </div>
                    <div className="columnEntrevista">
                        <div className="titleBoxEntrevista">
                            <h1 className="titleEntrevista" >{EntrevistaResponse.title}</h1>
                            <p className="dateEntrevista"><small className="text-muted">{EntrevistaResponse.date}</small></p>
                            <p className="introEntrevista">{EntrevistaResponse.interview.intro}</p>
                        </div>
                    </div>
                </div>
                <hr className="separadorTop" />
                <div className="textContentEntrevista">
                    {questions.map((f, index) =>
                        <div className="questionBox" key={f}>
                            <p className="questionsEntrevista">+{f}</p>
                            <p className="answersEntrevista">{answers[index]}</p>
                            {/* <hr className="separadorTop" /> */}
                        </div>
                    )
                    }

                    {EntrevistaResponse.links.map((n) =>
                        <div className="mediaPlayer">
                            {/* <a href={n} target="_blank" rel="noopener noreferrer" className="reproductorEntrevista">{n}<br />
                    </a> */}
                            <ReactPlayer url={n} />
                        </div>)}

                </div>
            </div>
            <button className="backButton" onClick={() => history.goBack()}>Back</button>
        </>
    )
}

