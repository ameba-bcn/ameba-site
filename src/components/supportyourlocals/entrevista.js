import React from 'react';
import { useHistory } from "react-router-dom";
import HeaderMenu from '../headerMenu';


export default function Entrevista(props) {
    let history = useHistory();
    const EntrevistaResponse = props.location.aboutProps;
    let answers = EntrevistaResponse.interview.answers;
    let questions = EntrevistaResponse.interview.questions;

    return (
        <>
            <HeaderMenu />
            <div className="fullEntrevista" >

                <div className="rowEntrevista">
                    <img className="imgEntrevista" src={EntrevistaResponse.img} alt={EntrevistaResponse.title} />
                    <div className="columnEntrevista">
                        <div className="titleBoxEntrevista">
                            <h1 className="titleEntrevista" >{EntrevistaResponse.title}</h1>
                            <p className="dateEntrevista"><small className="text-muted">{EntrevistaResponse.date}</small></p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="textContentEntrevista">
                    <p className="introEntrevista">{EntrevistaResponse.interview.intro}</p>
                    {
                        questions.map((f, index) =>
                            <div key={f}>
                                <p className="questionsEntrevista">+{f}</p>
                                <p>{answers[index]}</p>
                            </div>
                        )
                    }

                    {EntrevistaResponse.links.map((n) => <a href={n} target="_blank" rel="noopener noreferrer" className="reproductorEntrevista">{n}<br/></a>)}

                </div>
            </div>
            <button onClick={() => history.goBack()}>Back</button>
        </>
    )
}

