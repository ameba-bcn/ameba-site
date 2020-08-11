import React from 'react';
import data from './response.json';


function llistatActivitats() {
    const cardGenerator = data.map((data) => {
        return (
            <div key={data.id}>
                <div className="card" style={{ width: "18rem" }}>
                    <img className="card-img-top" src={data.img} alt={data.title} />
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.article}</p>
                        <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div >
            <div className="card-deck">
                {cardGenerator}
            </div>
        </div>
    )

}

export default llistatActivitats;