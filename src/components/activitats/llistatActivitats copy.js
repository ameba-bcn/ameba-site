import React from 'react';
import Data from './response.json';
import MaterialTable from "material-table";

export default function LlistatActivitats() {

  const [state, setState] = React.useState({
    columns: [
      {
        title: '',
        field: 'url',
        render: rowData => <img src={rowData.img} style={{ width: 150, objectFit: "contain"
        }} alt="" />,
        cellStyle:{ maxWidth: 100 }
      },
      { title: 'Activitat', field: 'title',cellStyle:  { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 100}} ,
      { title: 'Descripció', field: 'article', cellStyle:  { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 100}},
      { title: 'Data', field: 'date', cellStyle:{ maxWidth: 100 } },
      { title: 'Hora', field: 'hour', cellStyle:{ maxWidth: 100 } },
      { title: 'Adreça', field: 'address', cellStyle:{ maxWidth: 100 } }
    ],
    data: Data,

  });

  return (
    <div className="fullTableActiv">
      <MaterialTable
        title=""
        columns={state.columns}
        data={state.data}
        options={{
          actionsColumnIndex: -1
        }}
        // editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data.push(newData);
        //           return { ...prevState, data };
        //         });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         if (oldData) {
        //           setState((prevState) => {
        //             const data = [...prevState.data];
        //             data[data.indexOf(oldData)] = newData;
        //             return { ...prevState, data };
        //           });
        //         }
        //       }, 600);
        //     }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data.splice(data.indexOf(oldData), 1);
        //           return { ...prevState, data };
        //         });
        //       }, 600);
        //     }),
        // }}
      />
    </div>
  );

};