import React, { useEffect, useState } from 'react';
import Card3Grid from '../layout/Card3grid';
import SectionTitle from '../layout/SectionTitle';
import { NavLink } from 'react-router-dom';
import LettersMove from './../layout/LettersMove';
import axiosInstance from "../../axios";
import './Activitats.css'
import { getNFirstElementsOfArray } from "../../utils/utils";
function Activitats() {

    const [activitats, getActivitats] = useState([]);

    useEffect(() => {
        axiosInstance.get(`events/`, {})
            .then((res) => {
                console.log(res.data);
                return res.data
            }).then((response) => {
                getActivitats(getNFirstElementsOfArray(response, 3))
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    return (
        <div className="Bloque" id="activitats">
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#EB5E3E"
            />
            <SectionTitle title="activitats" />
            <Card3Grid className="Card3Block" activitats={activitats} />
            <div className="agendaLink">
                <NavLink className="navLinkActivitat" style={{ textDecoration: 'none' }}
                    to={{ pathname: '/activitats' }}>
                        <div className="moreAgendaPlus">+</div>
                        {/* <span>- - - &#62;</span> VEURE AGENDA <span>&#60; - - -</span> */}
                        </NavLink></div>
        </div>
    );
}

export default Activitats;