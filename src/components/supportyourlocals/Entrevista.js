import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './Entrevista.css'
import TitleSection from './TitleSection';
import axiosInstance from "../../axios";
import { Link } from "react-scroll";
// import state from './response2.js';
import ReactPlayer from "react-player";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LettersMove from './../layout/LettersMove';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import MediaLinks from './../layout/MediaLinks';
import ScrollTop from './../../components/layout/ScrollTop';

export default function Entrevista(props) {
    const breakpoint = useMediaQuery('(min-width:820px)');
    let history = useHistory();
    let location = useLocation();
    let urlID = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);

    const [interview, setInterview] = useState([
        {
            id: 0,
            title: "",
            image: "",
            introduction: "",
            created: "",
            current_answers: [{ 'answer': "", "question": "" }]
        }
    ]);

    const [artist, setArtist] = useState([
        {
            id: 0,
            name: "",
            images: [],
            biography: "",
            media_urls: []
        }
    ]);

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

    useEffect(() => {
        axiosInstance.get(`interviews/${urlID}/`, {})
            .then((res) => {
                console.log(res.data);
                setInterview(res.data)
                axiosInstance.get(`artists/${urlID}/`, {}).then((res) => {
                    console.log("artist", res.data);
                    setArtist(res.data)
                })
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, [urlID]);

    return (
        <>
            <div className="top-section-gral">
                <ScrollTop showBelow={250} />
                <div className="top-section_entr">
                    <div className="ts-title">{interview.title}</div>
                    <div className="ts-breadcrumbs">
                        <span onClick={() => history.push('/')}>AMEBA</span> / <span onClick={() => history.goBack()}>#SUPPORTYOURLOCALS</span> / {interview.title}
                    </div>
                    <div className="ts-tags">
                        <div className="tags-e">dj</div>
                        <div className="tags-e">productor</div>
                        <div className="tags-e">manager</div>
                        <div className="tags-e">mastering</div>
                        <div className="tags-e">label</div>
                    </div>
                    <div className="menu-entrevista">
                        <Link activeClass="active" to="bio-gral" spy={true} smooth={true} duration={500}>
                            <div className="menu-e menu-bio">BIO</div>
                        </Link>
                        <Link activeClass="active" to="entrevista-gral" spy={true} smooth={true} duration={500}>
                            <div className="menu-e menu-entrev">ENTREVISTA</div>
                        </Link>
                        <Link activeClass="active" to="media-gral" spy={true} smooth={true} duration={500}>
                            <div className="menu-e menu-media">MEDIA</div>
                        </Link>
                        <Link activeClass="active" to="activitats-gral" spy={true} smooth={true} duration={500}>
                            <div className="menu-e menu-activit">ACTIVITATS</div>
                        </Link>
                    </div>
                </div>

                <div className="bio-gral">
                    <TitleSection title="BIO" />
                    <div className="bio-section">
                        <div className="bio-highlights">
                            <div className="bio-data">NOM/ <span>{interview.title}</span></div>
                            <div className="bio-data">CIUTAT/ <span>DUMMY TEXT</span></div>
                            <div className="bio-data">SEGELLS/ <span>DUMMY TEXT</span></div>
                            <div className="bio-data">PROJECTES/ <span>DUMMY TEXT</span></div>
                            <div className="bio-data">ARTISTES/ <span>DUMMY TEXT</span></div>
                        </div>
                        <div className="bio-text">
                            {artist.biography}</div>
                        {artist.images && (<div className="bio-img">
                            <img className="bio-img-src" src={artist.images[0]} alt={artist.name} />
                        </div>)}
                    </div>
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#FFED00"} />
            <div className="entrevista-gral">
                <TitleSection title="Entrevista" />
                <div className="entrevista-columnes">
                    {breakpoint ? <>
                        <div className="col1-preguntes">
                            {interview.current_answers?.map((f, i) => (
                                (i < 3 ?
                                    <div className="pregunta" key={i}>
                                        {f.question}
                                        {expand.p[i] ? <IndeterminateCheckBoxIcon className="collapse-resp" onClick={() => updateExpand(i)} />
                                            : <AddBoxIcon className="expand-resp" onClick={() => updateExpand(i)} />}
                                        {expand.p[i] ? <div className={"resposta"}>{f.answer}</div> : null}
                                        <hr />
                                    </div>
                                    : null)
                            ))}
                        </div>
                        <div className="col2-preguntes">
                            {interview.current_answers?.map((f, i) => (
                                (i > 2 ?
                                    <div className="pregunta" key={i}>
                                        {f.question}
                                        {expand.p[i] ? <IndeterminateCheckBoxIcon className="collapse-resp" onClick={() => updateExpand(i)} />
                                            : <AddBoxIcon className="expand-resp" onClick={() => updateExpand(i)} />}
                                        {expand.p[i] ? <div className={"resposta"}>{f.answer}</div> : null}
                                        <hr />
                                    </div>
                                    : null)
                            ))}
                        </div>
                    </> :
                        <>
                            {interview.current_answers?.map((f, i) => (
                                <div className="pregunta" key={i}>
                                    {f.question}
                                    {expand.p[i] ? <IndeterminateCheckBoxIcon className="collapse-resp" onClick={() => updateExpand(i)} />
                                        : <AddBoxIcon className="expand-resp" onClick={() => updateExpand(i)} />}
                                    {expand.p[i] ? <div className={"resposta"}>{f.answer}</div> : null}
                                    <hr />
                                </div>
                            ))}
                        </>}
                </div>
            </div>
            <LettersMove sentence={"l'associació de música electrònica de barcelona"} color={"#F2C571"} />
            <div className="media-gral">
                {artist.media_urls && artist.media_urls.length > 0 ? <>
                    <TitleSection title="Media" />
                    <div className="media-artista">
                        {artist.media_urls.map((n) =>
                            <div className="mediaPlayer">
                                <ReactPlayer url={n} />
                            </div>)}
                    </div></> : null}
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

