import React from 'react';
import data from './response.json';
import { NavLink, Redirect } from 'react-router-dom';
// import Entrevista from './entrevista';
import './LlistatEntrevistes.css';


export default function llistatEntrevistes() {

    const cardClicked = (data) => {
        return <Redirect to={`/Support/Entrevista?='${data.id}`} />
    }

    const cardGenerator = data.map((data) => {
        return (
            <div className="fullcard" key={data.id}
                onClick={() => cardClicked(data)}>
                <NavLink style={{ textDecoration: 'none' }}
                    to={{
                        pathname: '/support/' + data.id,
                        aboutProps: data
                    }}>
                    <div className="cardSupport">
                        <img className="cardSupportImgTop" src={data.img} alt={data.title} />
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