import React from 'react';
// import data from './response.json';
import MaterialTable from "material-table";



export default function LlistatActivitats() {
    // const cardGenerator = data.map((data) => {
    //     return (
    //         <div className="fullcard" key={data.id}>
    //             <div className="card" style={{ width: "26rem" }}>
    //                 <img className="card-img-top" src={data.img} alt={data.title} />
    //                 <div className="card-body">
    //                     <h5 className="card-title">{data.title}</h5>
    //                     <p className="card-text">{data.article}</p>
    //                     <p className="card-text"><small className="text-muted">{data.date}</small></p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    // return (
    //     <div className="card-deck">
    //         {cardGenerator}
    //     </div>
    // )

    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ],
        data: [
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          {
            name: 'Zerya Betül',
            surname: 'Baran',
            birthYear: 2017,
            birthCity: 34,
          },
        ],
      });
    
      return (
          <div className="fullTableActiv">
        <MaterialTable
          title="Editable Example"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
        </div>
      );

};