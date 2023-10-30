import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import { TiTicket } from "react-icons/ti";
import axiosInstance from "../../axios";
import ActivitatDialog from "./Activitat";
import {
  formatDateToHour,
  formatISODateToDate,
  sortByDate,
} from "./../../utils/utils";
import "./Agenda.css";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../utils/constants";

export default function LlistatActivitats() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { agenda = [] } = useSelector((state) => state.data);
  const { user_profile = "" } = useSelector((state) => state.profile);
  const noResultsMessage = <span>No s&apos;han trobat resultats</span>;
  const [t] = useTranslation("translation");

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
      .get(`${API_URL}events/${rowData.id}`, {})
      .then((res) => {
        dispatch(addToCart(res.data.variants[0].id));
      })
      .then(setRedirect(true))
      .catch((err) => {
        if (err.response) {
          console.log(
            "ERROR: client received an error response (5xx, 4xx)",
            err.response
          );
        } else if (err.request) {
          console.log(
            "ERROR: client never received a response, or request never left",
            err.response
          );
        } else {
          console.log("ERROR", err);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.response);
      });
  };

  const fetchEvent = (data) => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}events/${data.id}`, {})
      .then((res) => {
        setEventData(res.data);
        setLoading(false);
      })
      .then(handleClickOpen())
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log(
            "ERROL: client received an error response (5xx, 4xx)",
            err.response
          );
        } else if (err.request) {
          console.log(
            "ERROL: client never received a response, or request never left",
            err.response
          );
        } else {
          console.log("ERROL: anything else", err);
        }
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
        title: t("agenda.activitat"),
        field: "name",
        render: (rowData) => (
          <div className="row">
            <div className="column activitatImg">
              <img src={rowData.images} className="imgMiniActivitat" alt="" />
            </div>
            <div className="column activitatDescripcio">
              <h5 className="mainActivitatSubtitle">{rowData.address}</h5>
              <h1 className="mainActivitatTitle">
                {rowData.name?.toUpperCase()}
              </h1>
            </div>
            <div className="horaDataPetit">
              <h5 className="mainActivitatSubtitle">
                {formatISODateToDate(rowData.datetime)}{" "}
                {formatDateToHour(rowData.datetime)}
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
        title: t("agenda.data"),
        field: "datetime",
        render: (rowData) => (
          <div className="horaDataActivitat">
            <h1 className="mainActivitatTitle">
              {formatISODateToDate(rowData.datetime)}
            </h1>
          </div>
        ),
        cellStyle: { width: 200, maxWidth: 200, textAlign: "center" },
        sorting: true,
        sortDirection: "desc",
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
              {formatDateToHour(rowData.datetime)}
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
          data={sortByDate(agenda)}
          options={{
            actionsColumnIndex: -1,
            paging: false,
            sorting: true,
            search: true,
          }}
          onRowClick={(evt, selectedRow) => {
            fetchEvent(selectedRow);
          }}
          actions={[
            (rowdata) => ({
              icon: () => (
                <TiTicket
                  disabled={!rowdata.hasStock}
                  className="cardActivitat"
                />
              ),
              tooltip: rowdata.hasStock ? "Reserva" : t("agenda.inactiu"),
              onClick: (event, rowdata) => {
                console.log("esee", rowdata.hasStock);
                const { hasStock } = rowdata;
                hasStock && fetchAndAdd(rowdata);
              },
              disabled: !rowdata.hasStock,
            }),
          ]}
          localization={{
            header: {
              actions: "Reserva",
            },
            body: {
              emptyDataSourceMessage: noResultsMessage,
            },
          }}
        />
      )}
      {open && (
        <ActivitatDialog
          open={open}
          dataRow={eventData}
          onClose={handleClose}
          setEventData={setEventData}
          loading={loading}
        />
      )}
    </div>
  );
}
