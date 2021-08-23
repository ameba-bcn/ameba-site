import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import { TiTicket } from "react-icons/ti";
import axiosInstance from "../../axios";
import ActivitatDialog from "./Activitat";
import {
  formatISODateToDate,
  formatISODateToHour,
  isCORSInactive,
} from "./../../utils/utils";
import "./Agenda.css";

export default function LlistatActivitats() {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.data);
  const { agenda = [] } = data;
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;

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
      artists: [false],
    },
  ]);

  const fetchAndAdd = (rowData) => {
    axiosInstance
      .get(`events/${rowData.id}`, {})
      .then((res) => {
        dispatch(addToCart(res.data.variants[0].id));
      })
      .then(setRedirect(true))
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  };

  const fetchEvent = (data) => {
    axiosInstance
      .get(`events/${data.id}`, {})
      .then((res) => {
        setEventData(res.data);
      })
      .then(handleClickOpen())
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state] = React.useState({
    columns: [
      {
        title: "Descripció",
        field: "details",
        render: (rowData) => (
          <div className="row">
            <div className="column activitatImg">
              <img
                src={isCORSInactive() + rowData.images}
                className="imgMiniActivitat"
                alt=""
              />
            </div>
            <div className="column activitatDescripcio">
              <h5 className="mainActivitatSubtitle">{rowData.address}</h5>
              <h1 className="mainActivitatTitle">{rowData.name}</h1>
            </div>
            <div className="horaDataPetit">
              <h5 className="mainActivitatSubtitle">
                {formatISODateToDate(rowData.datetime)}{" "}
                {formatISODateToHour(rowData.datetime)}
              </h5>
            </div>
          </div>
        ),
        cellStyle: { width: 800 },
        headerStyle: {
          textAlign: "center",
          minWidth: 50,
        },
      },
      {
        title: "Data",
        field: "date",
        render: (rowData) => (
          <div className="horaDataActivitat">
            <h1 className="mainActivitatTitle">
              {formatISODateToDate(rowData.datetime)}
            </h1>
          </div>
        ),
        cellStyle: { width: 200, maxWidth: 200, textAlign: "center" },
        headerStyle: {
          width: 200,
          maxWidth: 200,
          textAlign: "center",
        },
      },
      {
        title: "Hora",
        field: "hour",
        render: (rowData) => (
          <div className="horaDataActivitat">
            <h1 className="mainActivitatTitle">
              {formatISODateToHour(rowData.datetime)}
            </h1>
          </div>
        ),
        cellStyle: { width: 200, maxWidth: 200, textAlign: "center" },
        sorting: false,
        headerStyle: {
          width: 200,
          maxWidth: 200,
          textAlign: "center",
        },
      },
    ],
    data: agenda, // Respuesta API aqui
    results: [],
  });

  const checkoutRedirect = user_profile === "LOGGED" ? "/checkout" : "/login";

  if (redirect) return <Redirect to={checkoutRedirect} />;

  return (
    <div className="fullTableActiv">
      {agenda.length > 0 && (
        <MaterialTable
          title=""
          className="materialTableGeneral"
          columns={state.columns}
          data={agenda}
          options={{
            actionsColumnIndex: -1,
            paging: false,
          }}
          onRowClick={(evt, selectedRow) => {
            fetchEvent(selectedRow);
          }}
          actions={[
            {
              icon: () => <TiTicket className="cardActivitat" />,
              tooltip: "Reserva",
              onClick: (event, rowData) => {
                fetchAndAdd(rowData);
              },
            },
          ]}
          localization={{
            header: {
              actions: "Reserva",
            },
          }}
        />
      )}
      <ActivitatDialog open={open} dataRow={eventData} onClose={handleClose} />
    </div>
  );
}
