import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/actions/cart';
import { Redirect } from 'react-router-dom';
import MaterialTable from "material-table";
import { TiTicket } from 'react-icons/ti';
import axiosInstance from "../../axios";
import ActivitatDialog from './Activitat';
import { formatISODateToDate, formatISODateToHour } from './../../utils/utils'
import './Agenda.css';

export default function LlistatActivitats() {
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleAddClick = (rowData) => {
    dispatch(addToCart(rowData.id))
    handleClose();
    setRedirect(true)
  }

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
              <h5 className="mainActivitatSubtitle">{formatISODateToDate(rowData.datetime)} {formatISODateToHour(rowData.datetime)}</h5>
            </div>
          </div>,

        headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Data', field: 'date',
        render: rowData => <div className="horaDataActivitat"><h1 className="mainActivitatTitle">{formatISODateToDate(rowData.datetime)}</h1></div>
        // , cellStyle: { width: 200 }
        , headerStyle: {
          textAlign: 'center'
        }
      },
      {
        title: 'Hora', field: 'hour',
        render: rowData => <div className="horaDataActivitat"><h1 className="mainActivitatTitle">{formatISODateToHour(rowData.datetime)}</h1></div>,
        // cellStyle: { width: 200 },
        sorting: false,
        headerStyle: {
          textAlign: 'center'
        }
      }
    ],
    data: eventsData, // Respuesta API aqui
    results: []
  });

  if (redirect) { return <Redirect to='/checkout' /> }

  return (
    <div className="fullTableActiv">
      <MaterialTable
        title=""
        className="materialTableGeneral"
        columns={state.columns}
        data={eventsData}
        options={{
          actionsColumnIndex: -1,
        }}
        onRowClick={((evt, selectedRow) => {
          // setSelectedRow(selectedRow.id)
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
              handleAddClick(rowData)
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