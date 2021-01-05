import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
// import ReactPlayer from "react-player";
import './Entrevista.css'
import axiosInstance from "../../axios";

export default function Entrevista(props) {
    let history = useHistory();
    let location = useLocation();
    let urlID = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);

    const [state, setState] = useState([
        {
            id: 0,
            name: "",
            image: "",
            biography: "",
            created: "",
            current_answers: [{ 'answer': "", "question": "" }]
        }
    ]);
    useEffect(() => {
        axiosInstance.get(`artists/${urlID}/`, {})
            .then((res) => {
                console.log(res)
                console.log(res.data);
                return res.data
            }).then((response) => {
                setState(response)
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    return (
        <>
            <div className="fullEntrevista" >
                <div className="rowEntrevista">
                    <div className="columnImatge">
                        <img className="imgEntrevista" src={state.image} alt={state.name} />
                    </div>
                    <div className="columnEntrevista">
                        <div className="titleBoxEntrevista">
                            <h1 className="titleEntrevista" >{state.name}</h1>
                            <p className="dateEntrevista"><small className="text-muted">{state.created}</small></p>
                            <p className="introEntrevista">{state.biography}</p>
                        </div>
                    </div>
                </div>
                <hr className="separadorTop" />
                <div className="textContentEntrevista">
                    {console.log("AAAAAAAAA", state.current_answers)}
                    {state.current_answers === undefined ? null : (state.current_answers.map((f) => (
                        <div className="questionBox" key={f.question}>
                            <p className="questionsEntrevista">+{f.question}</p>
                            <p className="answersEntrevista">{f.answer}</p>
                        </div>
                    )))}

                    {/* falta la urls en la db */}
                    {/* {EntrevistaResponse.links.map((n) =>
                        <div className="mediaPlayer">
                            <ReactPlayer url={n} />
                        </div>)} */}

                </div>
            </div>
            <button className="backButton" onClick={() => history.goBack()}>Back</button>
        </>
    )
}

