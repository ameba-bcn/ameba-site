import React, { useEffect, useState } from 'react';
import Data from './response.json';
import MaterialTable from "material-table";
// import { FiShoppingCart } from 'react-icons/fi';
import { TiTicket } from 'react-icons/ti';
import axiosInstance from "../../axios";
import ActivitatDialog from './Activitat';
import './Agenda.css';

export default function LlistatActivitats() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [rowClickedData, setState] = React.useState([]);
  const [eventsData, setEventsData] = useState([
    {
      id: 0,
      name: "",
      price: "",
      images: [""],
      discount: "",
      datetime: "",
      address: "",
      saved: "",
      purchased: ""
    }
  ]);

  const [eventData, setEventData] = useState([
    {
      id: 0,
      name: "",
      price: "",
      images: [""],
      discount: "",
      datetime: "",
      address: "",
      description: "",
      saved: "",
      purchased: "",
      stock: 0,
      is_active: false,
      artists: [false]
    }
  ]);

  const fetchEvent = (data) => {
    axiosInstance.get(`events/${data.id}`, {})
    .then((res) => {
        console.log(res.data);
        setEventData(res.data)
    }).then(handleClickOpen())
    .catch(error => {
        console.log("ERROL", error.response)
    });
}

  useEffect(() => {
    axiosInstance.get(`events/`, {})
      .then((res) => {
        console.log(res.data);
        setEventsData(res.data)
      })
      .catch(error => {
        console.log("ERROL", error.response)
      });
  }, []);


  const handleClickOpen = () => {
    setOpen(true);
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
              <img src={rowData.images} className="imgMiniActivitat" alt="" />
            </div>
            <div className="column activitatDescripcio">
              <h5 className="mainActivitatSubtitle">{rowData.address}</h5>
              <h1 className="mainActivitatTitle">{rowData.name}</h1>
            </div>
            <div className="horaDataPetit">
              <h5 className="mainActivitatSubtitle">{rowData.datetime}</h5>
            </div>
          </div>,

        headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Data', field: 'date',
        render: rowData => <div className="horaDataActivitat"><h1 className="mainActivitatTitle">{rowData.datetime}</h1></div>
        // , cellStyle: { width: 200 }
        , headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Hora', field: 'hour',
        render: rowData => <div className="horaDataActivitat"><h1 className="mainActivitatTitle">{rowData.datetime}</h1></div>,
        // cellStyle: { width: 200 },
        headerStyle: {
          textAlign: 'center'
        }
      }
    ],
    data: eventsData, // Respuesta API aqui
    results: []
  });

  return (
    <div className="fullTableActiv">
      <MaterialTable
        title=""
        className="materialTableGeneral"
        columns={state.columns}
        data={eventsData}
        options={{
          actionsColumnIndex: -1
        }}
        onRowClick={((evt, selectedRow) => {
          console.log("JJJJJJJJJJ", selectedRow)
          setSelectedRow(selectedRow.id)
          // setState({ selectedRow });
          fetchEvent(selectedRow)
          // setSelectedRow(selectedRow.tableData.id)
          // console.log(selectedRow);
          // setState({ selectedRow });
          // handleClickOpen();

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
      <ActivitatDialog open={open} dataRow={eventData} onClose={handleClose} />
    </div>
  );

};