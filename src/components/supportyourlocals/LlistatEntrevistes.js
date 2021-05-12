import React, { useState, useEffect } from 'react';
// import data from './response.json';
import { NavLink, Redirect } from 'react-router-dom';
import './LlistatEntrevistes.css';
import axiosInstance from "../../axios";
import ScrollTop from './../../components/layout/ScrollTop';

export default function LlistatEntrevistes() {

    const cardClicked = (id) => {
        return <Redirect to={`/support/entrevista?='${id}`} />
    };

    const [state, setState] = useState([
        {
            id: 0,
            name: "",
            images: [],
            bio_preview: "",
            created: ""
        }
    ]);

    useEffect(() => {
        axiosInstance.get(`artists/`, {})
            .then((res) => {
                console.log(res.data);
                return res.data
            }).then((response) => {
                setState(response)
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    const cardGenerator = state.map((data) => {
        return (
            <div className="fullcard" key={data.id}
                onClick={() => cardClicked(data.id)}>
                <NavLink style={{ textDecoration: 'none' }}
                    to={{
                        pathname: '/support/' + data.id,
                        aboutProps: data
                    }}>
                    <div className="cardSupport">
                        <img className="cardSupportImgTop" src={data.images[0]} alt={data.name} />
                        <div className="cardSupportTitle">
                            {data.name}
                        </div>
                        <div className="cardSupportPlusBox">+</div>
                        <div className="cardTagBox">DJ</div>
                    </div>
                </NavLink>
            </div>
        )
    })

    return (
        <div className="cardSupportDeck">
            <ScrollTop showBelow={250} />
            {cardGenerator}
        </div>
    )

};