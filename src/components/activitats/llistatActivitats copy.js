import React from 'react';
import data from './response.json';


export default function llistatActivitats() {
    const cardGenerator = data.map((data) => {
        return (
            <div className="fullcard" key={data.id}>
                <div className="card" style={{ width: "26rem" }}>
                    <img className="card-img-top" src={data.img} alt={data.title} />
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.article}</p>
                        <p className="card-text"><small className="text-muted">{data.date}</small></p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="card-deck">
            {cardGenerator}
        </div>
    )

};