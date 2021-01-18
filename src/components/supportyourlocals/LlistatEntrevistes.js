import React, {useState, useEffect} from 'react';
// import data from './response.json';
import { NavLink, Redirect } from 'react-router-dom';
// import Entrevista from './entrevista';
import './LlistatEntrevistes.css';
import axiosInstance from "../../axios";

export default function LlistatEntrevistes() {

    const cardClicked = (id) => {
        return <Redirect to={`/Support/Entrevista?='${id}`} />
    };

    const [state, setState] = useState([
        {
            id: 0,
            title: "",
            image: "",
            bio_preview: "",
            created: ""
        }
    ]);

    useEffect(() => {
        axiosInstance.get(`interviews/`, {})
            .then((res) => {
                console.log(res)
                console.log(res.data);
                return res.data
            }).then((response) =>{
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
                        <img className="cardSupportImgTop" src={data.image} alt={data.title} />
                        <div className="cardSupportTitle">
                            {data.title}
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
            {cardGenerator}
        </div>
    )

};