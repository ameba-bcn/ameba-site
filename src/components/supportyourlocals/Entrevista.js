import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './Entrevista.css'
import TitleSection from './TitleSection';
import axiosInstance from "../../axios";
import state from './response2.js';
// import ReactPlayer from "react-player";
import LettersMove from './../layout/LettersMove';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import MediaLinks from './../layout/MediaLinks';

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

    const [expand, setExpand] = useState({
        p: [
            false,
            false,
            false,
            false,
            false
        ]
    })

    const updateExpand = (i) => {
        const newIds = expand.p.slice()
        newIds[i] = !newIds[i];
        setExpand(
            { p: newIds }
        )
    }

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
                    <div className="ts-tags">
                        <div className="tags-e">dj</div>
                        <div className="tags-e">productor</div>
                        <div className="tags-e">manager</div>
                        <div className="tags-e">mastering</div>
                        <div className="tags-e">label</div>
                    </div>
                    <div className="menu-entrevista">
                        <div className="menu-e menu-bio">BIO</div>
                        <div className="menu-e menu-entrev">ENTREVISTA</div>
                        <div className="menu-e menu-media">MEDIA</div>
                        <div className="menu-e menu-activit">ACTIVITATS</div>
                    </div>
                </div>
                <TitleSection title="BIO" id="BIO"/>
                <div className="bio-section">
                    <div className="bio-highlights">
                        <div className="bio-data">NOM/ <span>{state.title}</span></div>
                        <div className="bio-data">CIUTAT/ <span>DUMMY TEXT</span></div>
                        <div className="bio-data">SEGELLS/ <span>DUMMY TEXT</span></div>
                        <div className="bio-data">PROJECTES/ <span>DUMMY TEXT</span></div>
                        <div className="bio-data">ARTISTES/ <span>DUMMY TEXT</span></div>
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
                        {state.current_answers.map((f, i) => (
                            (i < 3 ?
                                <div className="pregunta" id={i}>
                                    {f.questions}
                                    {expand.p[i] ? <IndeterminateCheckBoxIcon className="collapse-resp" onClick={() => updateExpand(i)} />
                                        : <AddBoxIcon className="expand-resp" onClick={() => updateExpand(i)} />}
                                    {expand.p[i] ? <div className={"resposta"}>{f.answers}</div> : null}
                                    <hr />
                                </div>
                                : null)
                        ))}
                    </div>
                    <div className="col2-preguntes">
                        {state.current_answers.map((f, i) => (
                            (i > 2 ?
                                <div className="pregunta" id={i}>
                                    {f.questions}
                                    {expand.p[i] ? <IndeterminateCheckBoxIcon className="collapse-resp" onClick={() => updateExpand(i)} />
                                        : <AddBoxIcon className="expand-resp" onClick={() => updateExpand(i)} />}
                                    {expand.p[i] ? <div className={"resposta"}>{f.answers}</div> : null}
                                    <hr />
                                </div>
                                : null)
                        ))}
                    </div>
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#F2C571"} />
            <div className="media-gral">
                <TitleSection title="Media" />
                <div className="media-artista">
                    {/* {state.links.map((n) =>
                        <div className="mediaPlayer">
                            <ReactPlayer url={n} />
                        </div>)} */}
                </div>
                <TitleSection title="Xarxes socials" />
                <div className="xarxes-artista">
                    <MediaLinks
                        fcbk="#"
                        insta="#"
                        twit="#"
                        yout="#" />
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#EB5E3E"} />
            <div className="activitats-gral">
                <TitleSection title="Activitats" />
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#FAE6C5"} />
        </>
    )
}

