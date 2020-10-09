import React from 'react';
import data from './response.json';
import { NavLink, Redirect } from 'react-router-dom';
// import Entrevista from './entrevista';
import './LlistatEntrevistes.css';


export default function llistatEntrevistes() {

    const cardClicked = (data) =>  {
        return  <Redirect  to={`/Support/Entrevista?='${data.id}`} />
    }

    const cardGenerator = data.map((data) => {
        return (
            <div className="fullcard" key={data.id} 
            onClick={() => cardClicked(data)}>
                <NavLink style={{ textDecoration: 'none' }} 
                to={{pathname:'/support/'+data.id,
                aboutProps: data}}>
                <div className="card" style={{ width: "26rem" }}>
                    <img className="card-img-top" src={data.img} alt={data.title} />
                    <div className="card-body">
                        <h5 className="card-title" >{data.title}</h5>
                        <p className="card-text">{data.interview.intro}</p>
                        <p className="card-text"><small className="text-muted">{data.date}</small></p>
                    </div>
                </div>
                </NavLink>
            </div>
        )
    })

    return (
        <div className="card-deck">
            {cardGenerator}
        </div>
    )

};