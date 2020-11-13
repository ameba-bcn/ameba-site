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
                <div className="card-support">
                    <img className="card-support-img-top" src={data.img} alt={data.title} />
                    <div className="card-support-body">
                        <h5 className="card-support-title" >{data.title}</h5>
                        <p className="card-support-text">{data.interview.intro}</p>
                        <p className="card-support-text"><small className="text-muted">{data.date}</small></p>
                    </div>
                </div>
                </NavLink>
            </div>
        )
    })

    return (
        <div className="card-support-deck">
            {cardGenerator}
        </div>
    )

};