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
            title: "",
            image: "",
            introduction: "",
            created: "",
            current_answers: [{ 'answer': "", "question": "" }]
        }
    ]);
    useEffect(() => {
        axiosInstance.get(`interviews/${urlID}/`, {})
            .then((res) => {
                // console.log(res)
                console.log(res.data);
                setState(res.data)
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
                        <img className="imgEntrevista" src={state.image} alt={state.title} />
                    </div>
                    <div className="columnEntrevista">
                        <div className="titleBoxEntrevista">
                            <h1 className="titleEntrevista" >{state.title}</h1>
                            <p className="dateEntrevista"><small className="text-muted">{state.created}</small></p>
                            <p className="introEntrevista">{state.introduction}</p>
                        </div>
                    </div>
                </div>
                <hr className="separadorTop" />
                <div className="textContentEntrevista">
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

