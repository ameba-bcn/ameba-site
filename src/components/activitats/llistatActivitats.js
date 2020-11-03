import React, { useState } from 'react';
import Data from './response.json';
import MaterialTable from "material-table";
// import { FiShoppingCart } from 'react-icons/fi';
import { TiTicket } from 'react-icons/ti';
import './LlistatActivitats.css';
import SimpleDialog from './Activitat';

export default function LlistatActivitats() {
  const [selectedRow , setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [rowClickedData, setState] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    // console.log(selectedRow)
  };

  const handleClose = () => {
    setOpen(false);
  }

  const [state] = React.useState({
    columns: [
      {
        title: 'Descripció',
        field: 'details',
        render: rowData =>
          <div className="row">
            <div className="column activitatImg">
              <img src={rowData.img} className="imgMiniActivitat" alt="" />
            </div>
            <div className="column activitatDescripcio">
              <h5>{rowData.address}</h5>
              <h1>{rowData.title}</h1>
              <p>{rowData.article}</p>
            </div>
            <div className="horaDataPetit">
            <h5>{rowData.date} - {rowData.hour}</h5>
            </div>
          </div>,
        
        headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Data', field: 'date',
        render: rowData => <div className="horaDataActivitat"><h1>{rowData.date}</h1></div>
        // , cellStyle: { width: 200 }
        ,headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Hora', field: 'hour',
        render: rowData => <div className="horaDataActivitat"><h1>{rowData.hour}</h1></div>,
        // cellStyle: { width: 200 },
        headerStyle: {
          textAlign: 'center'
        }
      }
    ],
    data: Data, // Respuesta API aqui
    results: []
  });

  return (
    <div className="fullTableActiv">
      <MaterialTable
        title=""
        className="materialTableGeneral"
        columns={state.columns}
        data={state.data}
        options={{
          actionsColumnIndex: -1
        }}
        onRowClick={((evt, selectedRow) => {
          setSelectedRow(selectedRow.tableData.id)
          // console.log(selectedRow);
          setState({ selectedRow });
          handleClickOpen();

        })}
        actions={[
          {
            icon: () => <TiTicket className="cardActivitat" />,
            tooltip: 'Reserva',
            onClick: (event, rowData) => {
              // Do save operation
            }
          }
        ]}
        localization={{
          header: {
            actions: 'Reserva'
          }
        }}
      />
      <SimpleDialog open={open} dataRow={rowClickedData} onClose={handleClose} />
    </div>
  );

};